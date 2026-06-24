package com.oms.backend.controllers;

import com.oms.backend.entities.AdoptionRequest;
import com.oms.backend.services.AdoptionRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/adoptions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdoptionRequestController {

    private final AdoptionRequestService adoptionRequestService;

    @GetMapping
    public List<AdoptionRequest> getAllRequests() {
        return adoptionRequestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdoptionRequest> getRequestById(@PathVariable String id) {
        return adoptionRequestService.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public AdoptionRequest createRequest(@RequestBody AdoptionRequest request) {
        if (request.getRequestDate() == null) {
            request.setRequestDate(LocalDate.now());
        }
        if (request.getStatus() == null) {
            request.setStatus("PENDING");
        }
        return adoptionRequestService.saveRequest(request);
    }

    @PutMapping("/{id}/status")
    public AdoptionRequest updateStatus(@PathVariable String id, @RequestParam String status, @RequestParam(required = false) String notes) {
        return adoptionRequestService.updateRequestStatus(id, status, notes);
    }

    @PutMapping("/{id}")
    public AdoptionRequest updateRequest(@PathVariable String id, @RequestBody AdoptionRequest request) {
        request.setId(id);
        return adoptionRequestService.saveRequest(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable String id) {
        adoptionRequestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}
