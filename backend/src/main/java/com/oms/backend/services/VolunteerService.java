package com.oms.backend.services;

import com.oms.backend.entities.Volunteer;
import com.oms.backend.repositories.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VolunteerService {
    private final VolunteerRepository volunteerRepository;

    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    public Optional<Volunteer> getVolunteerById(String id) {
        return volunteerRepository.findById(id);
    }

    public Volunteer saveVolunteer(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    public Volunteer updateVolunteerStatus(String id, String status) {
        Volunteer volunteer = volunteerRepository.findById(id).orElseThrow();
        volunteer.setStatus(status);
        return volunteerRepository.save(volunteer);
    }

    public void deleteVolunteer(String id) {
        volunteerRepository.deleteById(id);
    }
}
