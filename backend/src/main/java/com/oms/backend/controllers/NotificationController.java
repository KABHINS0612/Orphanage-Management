package com.oms.backend.controllers;

import com.oms.backend.entities.Notification;
import com.oms.backend.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationRepository repository;

    @GetMapping
    public List<Notification> getAllNotifications() {
        return repository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getUserNotifications(@PathVariable String userId) {
        return repository.findByUserId(userId);
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);
        return repository.save(notification);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable String id) {
        return repository.findById(id).map(notif -> {
            notif.setRead(true);
            return ResponseEntity.ok(repository.save(notif));
        }).orElse(ResponseEntity.notFound().build());
    }
}
