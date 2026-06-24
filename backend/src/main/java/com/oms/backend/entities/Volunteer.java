package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "volunteers")
public class Volunteer {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    
    private List<String> skills;
    private String availability; // e.g., "Weekends", "Full-time", "Evenings"
    private List<String> eventsParticipated;
    
    private String status; // "PENDING", "APPROVED", "REJECTED"
    private LocalDate registrationDate;
}
