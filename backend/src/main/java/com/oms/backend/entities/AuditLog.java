package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "audit_logs")
public class AuditLog {
    @Id
    private String id;
    private String username;
    private String action; // e.g., "CREATED_ORPHAN", "DELETED_STAFF"
    private String details;
    private LocalDateTime timestamp;
    private String ipAddress;
}
