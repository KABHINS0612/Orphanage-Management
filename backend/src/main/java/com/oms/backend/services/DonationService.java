package com.oms.backend.services;

import com.oms.backend.dto.DonationRequest;
import com.oms.backend.entities.Donation;
import com.oms.backend.entities.Donor;
import com.oms.backend.repositories.DonationRepository;
import com.oms.backend.repositories.DonorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final DonorRepository donorRepository;

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public Donation addDonation(DonationRequest request) {
        Donor donor = donorRepository.findById(request.getDonorId())
                .orElseThrow(() -> new RuntimeException("Donor not found with id: " + request.getDonorId()));

        Donation donation = new Donation();
        donation.setAmount(request.getAmount());
        donation.setDate(request.getDate());
        donation.setPurpose(request.getPurpose());
        donation.setDonor(donor);

        return donationRepository.save(donation);
    }

    public void deleteDonation(String id) {
        donationRepository.deleteById(id);
    }
}
