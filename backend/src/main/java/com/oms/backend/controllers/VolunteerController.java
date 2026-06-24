package com.oms.backend.controllers;

import com.oms.backend.entities.Volunteer;
import com.oms.backend.services.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VolunteerController {

    private final VolunteerService volunteerService;

    @GetMapping
    public List<Volunteer> getAllVolunteers() {
        return volunteerService.getAllVolunteers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Volunteer> getVolunteerById(@PathVariable String id) {
        return volunteerService.getVolunteerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Volunteer createVolunteer(@RequestBody Volunteer volunteer) {
        if (volunteer.getRegistrationDate() == null) {
            volunteer.setRegistrationDate(LocalDate.now());
        }
        if (volunteer.getStatus() == null) {
            volunteer.setStatus("PENDING");
        }
        return volunteerService.saveVolunteer(volunteer);
    }

    @PutMapping("/{id}/status")
    public Volunteer updateStatus(@PathVariable String id, @RequestParam String status) {
        return volunteerService.updateVolunteerStatus(id, status);
    }

    @PutMapping("/{id}")
    public Volunteer updateVolunteer(@PathVariable String id, @RequestBody Volunteer volunteer) {
        volunteer.setId(id);
        return volunteerService.saveVolunteer(volunteer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVolunteer(@PathVariable String id) {
        volunteerService.deleteVolunteer(id);
        return ResponseEntity.noContent().build();
    }
}
