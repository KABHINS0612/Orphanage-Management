package com.oms.backend.repositories;

import com.oms.backend.entities.Donation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface DonationRepository extends MongoRepository<Donation, String> {
    @Query("{ 'donor._id' : ?0 }")
    List<Donation> findByDonorId(String donorId);
}
