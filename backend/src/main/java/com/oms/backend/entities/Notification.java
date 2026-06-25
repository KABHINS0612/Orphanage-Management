package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;
    private String userId; // Null if it's a broadcast
    private String title;
    private String message;
    private String type; // e.g., INFO, ALERT, SUCCESS
    private LocalDateTime createdAt;
    private boolean isRead;
}
