package com.oms.backend.controllers;

import com.oms.backend.entities.Expense;
import com.oms.backend.services.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.saveExpense(expense));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
