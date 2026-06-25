package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import lombok.Data;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String username;
    
    private String password;
    
    private String role;
    
    private String donorId;
    private String staffId;
    private String orphanId;
    private String volunteerId;
    private String adopterId;
    
    private int failedAttemptCount = 0;
    private java.time.LocalDateTime accountLockedUntil;
    private java.time.LocalDateTime lastLoginDate;
}
