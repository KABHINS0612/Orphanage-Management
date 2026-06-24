package com.oms.backend.repositories;

import com.oms.backend.entities.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExpenseRepository extends MongoRepository<Expense, String> {
}
