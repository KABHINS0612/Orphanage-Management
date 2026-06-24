package com.oms.backend.repositories;

import com.oms.backend.entities.Donation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DonationRepository extends MongoRepository<Donation, String> {
}
