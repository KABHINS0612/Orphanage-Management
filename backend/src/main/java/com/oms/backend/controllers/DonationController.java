package com.oms.backend.controllers;

import com.oms.backend.dto.DonationRequest;
import com.oms.backend.entities.Donation;
import com.oms.backend.services.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DonationController {

    private final DonationService donationService;

    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        return ResponseEntity.ok(donationService.getAllDonations());
    }

    @PostMapping
    public ResponseEntity<Donation> addDonation(@RequestBody DonationRequest request) {
        return ResponseEntity.ok(donationService.addDonation(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable String id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }
}
