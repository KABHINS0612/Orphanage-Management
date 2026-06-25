package com.oms.backend.repositories;

import com.oms.backend.entities.Adopter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdopterRepository extends MongoRepository<Adopter, String> {
    Optional<Adopter> findByEmail(String email);
}
