package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Document(collection = "donations")
public class Donation {
    @Id
    private String id;
    private Donor donor;
    private BigDecimal amount;
    private LocalDate date;
    private String purpose;
}
