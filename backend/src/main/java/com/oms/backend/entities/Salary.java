package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Document(collection = "salaries")
public class Salary {
    @Id
    private String id;
    private String staffId;
    private BigDecimal amount;
    private BigDecimal deductions;
    private String month;
    private String year;
    private LocalDate paymentDate;
    private String status; // e.g., "Paid", "Pending"
}
