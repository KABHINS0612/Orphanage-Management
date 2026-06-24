package com.oms.backend.controllers;

import com.oms.backend.entities.Donor;
import com.oms.backend.services.DonorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // For development
public class DonorController {

    private final DonorService donorService;

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donor> getDonorById(@PathVariable String id) {
        return ResponseEntity.ok(donorService.getDonorById(id));
    }

    @PostMapping
    public Donor createDonor(@RequestBody Donor donor) {
        return donorService.saveDonor(donor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Donor> updateDonor(@PathVariable String id, @RequestBody Donor donorDetails) {
        Donor donor = donorService.getDonorById(id);
        
        donor.setFirstName(donorDetails.getFirstName());
        donor.setLastName(donorDetails.getLastName());
        donor.setEmail(donorDetails.getEmail());
        donor.setPhone(donorDetails.getPhone());
        donor.setAddress(donorDetails.getAddress());
        
        return ResponseEntity.ok(donorService.saveDonor(donor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonor(@PathVariable String id) {
        donorService.deleteDonor(id);
        return ResponseEntity.noContent().build();
    }
}
