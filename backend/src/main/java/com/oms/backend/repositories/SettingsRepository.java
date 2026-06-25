package com.oms.backend.repositories;

import com.oms.backend.entities.Settings;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsRepository extends MongoRepository<Settings, String> {
}
