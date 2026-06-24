package com.oms.backend.services;

import com.oms.backend.entities.AdoptionRequest;
import com.oms.backend.repositories.AdoptionRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdoptionRequestService {
    private final AdoptionRequestRepository adoptionRequestRepository;

    public List<AdoptionRequest> getAllRequests() {
        return adoptionRequestRepository.findAll();
    }

    public Optional<AdoptionRequest> getRequestById(String id) {
        return adoptionRequestRepository.findById(id);
    }

    public AdoptionRequest saveRequest(AdoptionRequest request) {
        return adoptionRequestRepository.save(request);
    }

    public AdoptionRequest updateRequestStatus(String id, String status, String notes) {
        AdoptionRequest request = adoptionRequestRepository.findById(id).orElseThrow();
        request.setStatus(status);
        if (notes != null) {
            request.setVerificationNotes(notes);
        }
        return adoptionRequestRepository.save(request);
    }

    public void deleteRequest(String id) {
        adoptionRequestRepository.deleteById(id);
    }
}
