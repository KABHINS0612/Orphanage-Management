package com.oms.backend.controllers;

import com.oms.backend.entities.ContactMessage;
import com.oms.backend.repositories.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactMessageController {

    @Autowired
    private ContactMessageRepository repository;

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return repository.findAll();
    }

    @PostMapping
    public ContactMessage sendMessage(@RequestBody ContactMessage message) {
        message.setSentAt(LocalDateTime.now());
        message.setRead(false);
        return repository.save(message);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ContactMessage> markAsRead(@PathVariable String id) {
        return repository.findById(id).map(msg -> {
            msg.setRead(true);
            return ResponseEntity.ok(repository.save(msg));
        }).orElse(ResponseEntity.notFound().build());
    }
}
