package com.oms.backend.repositories;

import com.oms.backend.entities.Orphan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrphanRepository extends MongoRepository<Orphan, String> {
}
