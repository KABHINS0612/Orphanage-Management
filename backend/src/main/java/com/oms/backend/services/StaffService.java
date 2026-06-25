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

    @jakarta.annotation.PostConstruct
    public void init() {
        List<Staff> allStaff = staffRepository.findAll();
        boolean updated = false;
        for (Staff s : allStaff) {
            if (s.getEmployeeId() == null || s.getEmployeeId().isEmpty()) {
                s.setEmployeeId("EMP-" + java.util.UUID.randomUUID().toString().substring(0, 5).toUpperCase());
                staffRepository.save(s);
                updated = true;
            }
        }
        if (updated) {
            System.out.println("Assigned missing employee IDs to existing staff in MongoDB.");
        }
    }

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
