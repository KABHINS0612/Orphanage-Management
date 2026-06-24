package com.oms.backend.services;

import com.oms.backend.entities.Donor;
import com.oms.backend.repositories.DonorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonorService {

    private final DonorRepository donorRepository;

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    public Donor getDonorById(String id) {
        return donorRepository.findById(id).orElseThrow(() -> new RuntimeException("Donor not found"));
    }

    public Donor saveDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public void deleteDonor(String id) {
        donorRepository.deleteById(id);
    }
}
