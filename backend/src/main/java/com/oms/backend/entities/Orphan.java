package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDate;

@Data
@Document(collection = "orphans")
public class Orphan {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String gender;
    private LocalDate admissionDate;
    private String backgroundStory;
    private String healthStatus;
    private String notes;
    
    // New fields added in Phase 1 Expansion
    private String educationDetails;
    private String medicalRecords;
    private String guardianDetails;
    private String photoUrl;
    private String documentUrl;
}
