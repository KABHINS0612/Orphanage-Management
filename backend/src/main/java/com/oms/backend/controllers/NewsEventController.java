package com.oms.backend.controllers;

import com.oms.backend.entities.NewsEvent;
import com.oms.backend.repositories.NewsEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/news-events")
@CrossOrigin(origins = "*")
public class NewsEventController {

    @Autowired
    private NewsEventRepository repository;

    @GetMapping
    public List<NewsEvent> getAllNewsEvents() {
        return repository.findAll();
    }

    @PostMapping
    public NewsEvent createNewsEvent(@RequestBody NewsEvent newsEvent) {
        return repository.save(newsEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsEvent> updateNewsEvent(@PathVariable String id, @RequestBody NewsEvent updatedEvent) {
        return repository.findById(id).map(event -> {
            event.setTitle(updatedEvent.getTitle());
            event.setDescription(updatedEvent.getDescription());
            event.setContent(updatedEvent.getContent());
            event.setEventDate(updatedEvent.getEventDate());
            event.setImageUrl(updatedEvent.getImageUrl());
            event.setStatus(updatedEvent.getStatus());
            return ResponseEntity.ok(repository.save(event));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNewsEvent(@PathVariable String id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
