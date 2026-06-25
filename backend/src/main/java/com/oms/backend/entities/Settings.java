package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "settings")
public class Settings {
    @Id
    private String id; // Use a fixed ID like "singleton"
    private String orphanageName;
    private String contactEmail;
    private String contactPhone;
    private String address;
    private String aboutUs;
    private String facebookUrl;
    private String twitterUrl;
}
