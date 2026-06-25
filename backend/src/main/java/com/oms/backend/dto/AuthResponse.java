package com.oms.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String role;
    private String donorId;
    private String staffId;
    private String orphanId;
    private String volunteerId;
    private String adopterId;
}
