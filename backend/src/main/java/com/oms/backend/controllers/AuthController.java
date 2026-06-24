package com.oms.backend.controllers;

import com.oms.backend.dto.AuthRequest;
import com.oms.backend.dto.AuthResponse;
import com.oms.backend.dto.RegisterRequest;
import com.oms.backend.entities.Donor;
import com.oms.backend.entities.User;
import com.oms.backend.repositories.DonorRepository;
import com.oms.backend.repositories.UserRepository;
import com.oms.backend.security.JwtUtil;
import com.oms.backend.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByUsername(authRequest.getUsername()).orElseThrow();

        return ResponseEntity.ok(new AuthResponse(jwt, user.getRole(), user.getDonorId()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        Donor donor = new Donor();
        donor.setFirstName(request.getFirstName());
        donor.setLastName(request.getLastName());
        donor.setEmail(request.getEmail());
        donor.setPhone(request.getPhone());
        donor.setAddress(request.getAddress());
        donor = donorRepository.save(donor);

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_DONOR");
        user.setDonorId(donor.getId());
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
}
