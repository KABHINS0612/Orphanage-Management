package com.oms.backend.repositories;

import com.oms.backend.entities.NewsEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsEventRepository extends MongoRepository<NewsEvent, String> {
}
