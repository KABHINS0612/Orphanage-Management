package com.oms.backend.controllers;

import com.oms.backend.repositories.DonationRepository;
import com.oms.backend.repositories.ExpenseRepository;
import com.oms.backend.repositories.OrphanRepository;
import com.oms.backend.repositories.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private OrphanRepository orphanRepository;

    @Autowired
    private StaffRepository staffRepository;

    @GetMapping("/dashboard-summary")
    public Map<String, Object> getDashboardSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalOrphans", orphanRepository.count());
        summary.put("totalStaff", staffRepository.count());
        // For a real application, sum the amounts in MongoDB using aggregations
        // Here we just return the counts for MVP
        summary.put("totalDonationsCount", donationRepository.count());
        summary.put("totalExpensesCount", expenseRepository.count());
        return summary;
    }

    @GetMapping("/financial-monthly")
    public Map<String, Object> getMonthlyFinancials() {
        Map<String, Object> financials = new HashMap<>();
        // Placeholder for monthly aggregated financial data (Income vs Expense)
        financials.put("status", "This endpoint will return aggregated monthly financial data");
        return financials;
    }
}
