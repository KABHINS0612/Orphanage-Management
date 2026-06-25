package com.oms.backend.controllers;

import com.oms.backend.entities.AuditLog;
import com.oms.backend.repositories.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "*")
public class AuditLogController {

    @Autowired
    private AuditLogRepository repository;

    @GetMapping
    public List<AuditLog> getAllLogs() {
        return repository.findAll();
    }

    @PostMapping
    public AuditLog createLog(@RequestBody AuditLog log) {
        log.setTimestamp(LocalDateTime.now());
        return repository.save(log);
    }
}
