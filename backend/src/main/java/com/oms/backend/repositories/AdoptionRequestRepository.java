package com.oms.backend.repositories;

import com.oms.backend.entities.AdoptionRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdoptionRequestRepository extends MongoRepository<AdoptionRequest, String> {
}
