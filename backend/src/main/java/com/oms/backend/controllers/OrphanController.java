package com.oms.backend.controllers;

import com.oms.backend.entities.Orphan;
import com.oms.backend.entities.User;
import com.oms.backend.repositories.UserRepository;
import com.oms.backend.services.OrphanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orphans")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // For development
public class OrphanController {

    private final OrphanService orphanService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Orphan> getAllOrphans() {
        return orphanService.getAllOrphans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orphan> getOrphanById(@PathVariable String id) {
        return ResponseEntity.ok(orphanService.getOrphanById(id));
    }

    @PostMapping
    public Orphan createOrphan(@RequestBody Orphan orphan) {
        Orphan savedOrphan = orphanService.saveOrphan(orphan);
        
        // Auto-create a User account for the orphan using firstname.lastname or just firstname + id snippet
        String username = (savedOrphan.getFirstName() + (savedOrphan.getLastName() != null ? savedOrphan.getLastName() : "")).toLowerCase().replaceAll("\\s+", "");
        
        // Ensure uniqueness
        if (userRepository.findByUsername(username).isPresent()) {
            username = username + savedOrphan.getId().substring(savedOrphan.getId().length() - 4);
        }
        
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode("orphan123")); // default password
        user.setRole("ROLE_ORPHAN");
        user.setOrphanId(savedOrphan.getId());
        userRepository.save(user);
        
        return savedOrphan;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orphan> updateOrphan(@PathVariable String id, @RequestBody Orphan orphanDetails) {
        Orphan orphan = orphanService.getOrphanById(id);
        
        orphan.setFirstName(orphanDetails.getFirstName());
        orphan.setLastName(orphanDetails.getLastName());
        orphan.setDateOfBirth(orphanDetails.getDateOfBirth());
        orphan.setGender(orphanDetails.getGender());
        orphan.setAdmissionDate(orphanDetails.getAdmissionDate());
        orphan.setHealthStatus(orphanDetails.getHealthStatus());
        orphan.setNotes(orphanDetails.getNotes());
        
        // New fields
        orphan.setEducationDetails(orphanDetails.getEducationDetails());
        orphan.setMedicalRecords(orphanDetails.getMedicalRecords());
        orphan.setGuardianDetails(orphanDetails.getGuardianDetails());
        orphan.setPhotoUrl(orphanDetails.getPhotoUrl());
        orphan.setDocumentUrl(orphanDetails.getDocumentUrl());
        
        return ResponseEntity.ok(orphanService.saveOrphan(orphan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrphan(@PathVariable String id) {
        orphanService.deleteOrphan(id);
        return ResponseEntity.noContent().build();
    }
}
