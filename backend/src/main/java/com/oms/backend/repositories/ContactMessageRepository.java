package com.oms.backend.repositories;

import com.oms.backend.entities.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {
}
