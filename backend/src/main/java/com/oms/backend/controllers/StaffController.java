package com.oms.backend.controllers;

import com.oms.backend.entities.Staff;
import com.oms.backend.entities.User;
import com.oms.backend.repositories.UserRepository;
import com.oms.backend.services.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // For development
public class StaffController {

    private final StaffService staffService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable String id) {
        return ResponseEntity.ok(staffService.getStaffById(id));
    }

    @PostMapping
    public Staff createStaff(@RequestBody Staff staff) {
        Staff savedStaff = staffService.saveStaff(staff);
        
        // Auto-create a User account for the staff member using their email as username
        if (staff.getEmail() != null && !staff.getEmail().isEmpty()) {
            if (userRepository.findByUsername(staff.getEmail()).isEmpty()) {
                User user = new User();
                user.setUsername(staff.getEmail());
                user.setPassword(passwordEncoder.encode("staff123")); // default password
                user.setRole("ROLE_STAFF");
                // In the future, we could add a staffId field to User, similar to donorId.
                userRepository.save(user);
            }
        }
        
        return savedStaff;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable String id, @RequestBody Staff staffDetails) {
        Staff staff = staffService.getStaffById(id);
        
        staff.setFirstName(staffDetails.getFirstName());
        staff.setLastName(staffDetails.getLastName());
        staff.setDesignation(staffDetails.getDesignation());
        staff.setSalary(staffDetails.getSalary());
        staff.setAttendance(staffDetails.getAttendance());
        staff.setEmail(staffDetails.getEmail());
        staff.setPhone(staffDetails.getPhone());
        
        return ResponseEntity.ok(staffService.saveStaff(staff));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable String id) {
        staffService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }
}
