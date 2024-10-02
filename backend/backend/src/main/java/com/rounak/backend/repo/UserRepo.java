package com.rounak.backend.repo;

import com.rounak.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users, String> {
    Users findByPhone(String phone);
    Users findByEmail(String email);
}
