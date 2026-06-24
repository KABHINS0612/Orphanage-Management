package com.oms.backend.repositories;

import com.oms.backend.entities.Staff;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StaffRepository extends MongoRepository<Staff, String> {
}
