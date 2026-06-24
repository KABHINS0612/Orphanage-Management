package com.oms.backend.repositories;

import com.oms.backend.entities.Volunteer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VolunteerRepository extends MongoRepository<Volunteer, String> {
}
