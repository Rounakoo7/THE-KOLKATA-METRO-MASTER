package com.rounak.backend.controller;

import com.rounak.backend.model.Users;
import com.rounak.backend.service.FloydWarshallService;
import com.rounak.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private FloydWarshallService service2;

    @PostMapping("/register")
    public ResponseEntity<Users> register(@RequestBody Users user){
        String httpStatus = service.register(user);
        ResponseEntity<Users> response;
        if(httpStatus.equals("CREATED")){
            response = new ResponseEntity<Users>(user, HttpStatus.CREATED);
        }
        else{
            response = new ResponseEntity<Users>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) throws Exception {
        service2.firstrun();
        return service.verify(user);
    }
}