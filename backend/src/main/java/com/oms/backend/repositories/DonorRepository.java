package com.oms.backend.repositories;

import com.oms.backend.entities.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DonorRepository extends MongoRepository<Donor, String> {
}
