package com.rounak.backend.service;

import com.rounak.backend.model.Users;
import com.rounak.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Transactional
    public String register(Users user){
        user.setPassword(encoder.encode(user.getPassword()));
        if((repo.findByPhone(user.getPhone()) == null) && (repo.findByEmail(user.getEmail()) == null)) {
            repo.save(user);
            return "CREATED";
        }
        else{
            return "BAD_REQUEST";
        }
    }

    @Transactional
    public String verify(Users user) throws Exception {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getPhone(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getPhone());
        }
        else{
            throw new Exception("Invalid credentials");
        }
    }
}
