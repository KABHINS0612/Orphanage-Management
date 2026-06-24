package com.oms.backend.services;

import com.oms.backend.entities.Staff;
import com.oms.backend.repositories.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaffById(String id) {
        return staffRepository.findById(id).orElseThrow(() -> new RuntimeException("Staff not found"));
    }

    public Staff saveStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public void deleteStaff(String id) {
        staffRepository.deleteById(id);
    }
}
