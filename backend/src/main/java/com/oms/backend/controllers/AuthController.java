package com.oms.backend.controllers;

import com.oms.backend.dto.AuthRequest;
import com.oms.backend.dto.AuthResponse;
import com.oms.backend.dto.RegisterRequest;
import com.oms.backend.entities.Donor;
import com.oms.backend.entities.User;
import com.oms.backend.dto.ForgotPasswordRequest;
import com.oms.backend.dto.ResetPasswordRequest;
import com.oms.backend.entities.PasswordResetToken;
import com.oms.backend.repositories.PasswordResetTokenRepository;
import com.oms.backend.repositories.DonorRepository;
import com.oms.backend.repositories.UserRepository;
import com.oms.backend.repositories.VolunteerRepository;
import com.oms.backend.repositories.AdopterRepository;
import com.oms.backend.repositories.StaffRepository;
import com.oms.backend.repositories.OrphanRepository;
import com.oms.backend.entities.Volunteer;
import com.oms.backend.entities.Adopter;
import com.oms.backend.entities.Staff;
import com.oms.backend.entities.Orphan;
import com.oms.backend.security.JwtUtil;
import com.oms.backend.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final DonorRepository donorRepository;
    private final VolunteerRepository volunteerRepository;
    private final AdopterRepository adopterRepository;
    private final StaffRepository staffRepository;
    private final OrphanRepository orphanRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(authRequest.getUsername());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        User user = optionalUser.get();

        if (user.getAccountLockedUntil() != null && LocalDateTime.now().isBefore(user.getAccountLockedUntil())) {
            return ResponseEntity.status(403).body("Account is locked due to too many failed attempts. Try again later.");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (org.springframework.security.authentication.BadCredentialsException ex) {
            user.setFailedAttemptCount(user.getFailedAttemptCount() + 1);
            if (user.getFailedAttemptCount() >= 5) {
                user.setAccountLockedUntil(LocalDateTime.now().plusMinutes(15));
            }
            userRepository.save(user);
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        user.setFailedAttemptCount(0);
        user.setAccountLockedUntil(null);
        user.setLastLoginDate(LocalDateTime.now());
        userRepository.save(user);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails, authRequest.isRememberMe());

        return ResponseEntity.ok(new AuthResponse(
                jwt, 
                user.getRole(), 
                user.getDonorId(), 
                user.getStaffId(), 
                user.getOrphanId(), 
                user.getVolunteerId(), 
                user.getAdopterId()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        String type = request.getAccountType() != null ? request.getAccountType().toUpperCase() : "DONOR";
        
        if (type.equals("VOLUNTEER")) {
            Volunteer volunteer = new Volunteer();
            volunteer.setFirstName(request.getFirstName());
            volunteer.setLastName(request.getLastName());
            volunteer.setEmail(request.getEmail());
            volunteer.setPhone(request.getPhone());
            volunteer = volunteerRepository.save(volunteer);
            
            user.setRole("ROLE_VOLUNTEER");
            user.setVolunteerId(volunteer.getId());
        } else if (type.equals("ADOPTER")) {
            Adopter adopter = new Adopter();
            adopter.setFirstName(request.getFirstName());
            adopter.setLastName(request.getLastName());
            adopter.setEmail(request.getEmail());
            adopter.setPhone(request.getPhone());
            adopter.setAddress(request.getAddress());
            adopter = adopterRepository.save(adopter);
            
            user.setRole("ROLE_ADOPTER");
            user.setAdopterId(adopter.getId());
        } else if (type.equals("STAFF")) {
            Staff staff = new Staff();
            staff.setEmployeeId("EMP-" + UUID.randomUUID().toString().substring(0, 5).toUpperCase());
            staff.setFirstName(request.getFirstName());
            staff.setLastName(request.getLastName());
            staff.setEmail(request.getEmail());
            staff.setPhone(request.getPhone());
            staff = staffRepository.save(staff);
            
            user.setRole("ROLE_STAFF");
            user.setStaffId(staff.getId());
        } else if (type.equals("ORPHAN")) {
            Orphan orphan = new Orphan();
            orphan.setFirstName(request.getFirstName());
            orphan.setLastName(request.getLastName());
            orphan = orphanRepository.save(orphan);
            
            user.setRole("ROLE_ORPHAN");
            user.setOrphanId(orphan.getId());
        } else {
            // Default to DONOR
            Donor donor = new Donor();
            donor.setFirstName(request.getFirstName());
            donor.setLastName(request.getLastName());
            donor.setEmail(request.getEmail());
            donor.setPhone(request.getPhone());
            donor.setAddress(request.getAddress());
            donor = donorRepository.save(donor);
            
            user.setRole("ROLE_DONOR");
            user.setDonorId(donor.getId());
        }
        
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        User user = optionalUser.get();
        passwordResetTokenRepository.deleteByUserId(user.getId());

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUserId(user.getId());
        resetToken.setToken(token);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15));
        passwordResetTokenRepository.save(resetToken);

        // Normally we would send an email here. For development/testing, we return the token in the response body.
        return ResponseEntity.ok("Reset token generated (simulated email sent): " + token);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<PasswordResetToken> optionalToken = passwordResetTokenRepository.findByToken(request.getToken());
        if (optionalToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid reset token.");
        }

        PasswordResetToken resetToken = optionalToken.get();
        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken);
            return ResponseEntity.badRequest().body("Reset token has expired.");
        }

        User user = userRepository.findById(resetToken.getUserId()).orElseThrow();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);
        return ResponseEntity.ok("Password successfully reset.");
    }
}
