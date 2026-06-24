package com.oms.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Document(collection = "staff")
public class Staff {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String designation;
    private BigDecimal salary;
    private String attendance; // Simplification for MVP (could be a separate collection in the future)
    private String email;
    private String phone;
}
