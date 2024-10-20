package com.rounak.backend.repo;

import com.rounak.backend.model.DeauthenticatedJwts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeauthenticatedJwtRepo extends JpaRepository<DeauthenticatedJwts, String> {
    DeauthenticatedJwts findByJwt(String jwt);
}
