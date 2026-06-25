package com.oms.backend.repositories;

import com.oms.backend.entities.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUserId(String userId); // Useful to delete old tokens when a new one is requested
}
