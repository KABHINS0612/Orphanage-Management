package com.oms.backend.controllers;

import com.oms.backend.entities.Salary;
import com.oms.backend.repositories.SalaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/salaries")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // For development
public class SalaryController {

    private final SalaryRepository salaryRepository;

    @GetMapping
    public List<Salary> getAllSalaries() {
        return salaryRepository.findAll();
    }

    @GetMapping("/staff/{staffId}")
    public List<Salary> getSalariesByStaffId(@PathVariable String staffId) {
        return salaryRepository.findByStaffId(staffId);
    }

    @PostMapping
    public Salary createSalary(@RequestBody Salary salary) {
        if (salary.getPaymentDate() == null) {
            salary.setPaymentDate(LocalDate.now());
        }
        return salaryRepository.save(salary);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Salary> updateSalary(@PathVariable String id, @RequestBody Salary salaryDetails) {
        return salaryRepository.findById(id).map(salary -> {
            salary.setAmount(salaryDetails.getAmount());
            salary.setDeductions(salaryDetails.getDeductions());
            salary.setMonth(salaryDetails.getMonth());
            salary.setYear(salaryDetails.getYear());
            salary.setStatus(salaryDetails.getStatus());
            salary.setPaymentDate(salaryDetails.getPaymentDate());
            return ResponseEntity.ok(salaryRepository.save(salary));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalary(@PathVariable String id) {
        salaryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
