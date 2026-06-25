package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDate;

@Data
@Document(collection = "news_events")
public class NewsEvent {
    @Id
    private String id;
    private String title;
    private String description;
    private String content;
    private LocalDate eventDate;
    private String imageUrl;
    private String status; // PUBLISHED, DRAFT
}
