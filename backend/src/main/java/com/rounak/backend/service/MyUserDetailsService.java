package com.rounak.backend.service;

import com.rounak.backend.model.UserPrincipal;
import com.rounak.backend.model.Users;
import com.rounak.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        Users user = userRepo.findByPhone(phone);
        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }
        return new UserPrincipal(user);
    }
}
