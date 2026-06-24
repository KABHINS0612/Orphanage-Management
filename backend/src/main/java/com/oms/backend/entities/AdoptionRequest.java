package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDate;

@Data
@Document(collection = "adoption_requests")
public class AdoptionRequest {
    @Id
    private String id;
    
    // Applicant Details
    private String applicantName;
    private String spouseName;
    private String address;
    private String phone;
    private String email;
    private String occupation;
    private Double annualIncome;
    
    // Request Details
    private String orphanId; // Reference to the Orphan
    private String motivation;
    
    // Status tracking
    private String status; // PENDING, UNDER_VERIFICATION, APPROVED, REJECTED
    private String verificationNotes;
    private LocalDate requestDate;
}
