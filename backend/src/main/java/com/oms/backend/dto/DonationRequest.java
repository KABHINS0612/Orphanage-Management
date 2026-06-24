package com.oms.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class DonationRequest {
    private BigDecimal amount;
    private LocalDate date;
    private String purpose;
    private String donorId;
}
