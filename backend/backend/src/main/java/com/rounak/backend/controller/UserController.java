package com.rounak.backend.controller;

import com.rounak.backend.model.DeauthenticatedJwts;
import com.rounak.backend.model.OtpData;
import com.rounak.backend.model.ResendOtpRegisterData;
import com.rounak.backend.model.Users;
import com.rounak.backend.repo.DeauthenticatedJwtRepo;
import com.rounak.backend.service.FloydWarshallService;
import com.rounak.backend.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private FloydWarshallService service2;

    @Autowired
    private DeauthenticatedJwtRepo repo;

    @PostMapping("/register")
    public ResponseEntity<Users> register(@RequestBody Users user) throws MessagingException {
        String httpStatus = service.register(user);
        ResponseEntity<Users> response;
        if(httpStatus.equals("OK")){
            response = new ResponseEntity<>(user, HttpStatus.OK);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/verifyregistration")
    public ResponseEntity<String> verifyRegistration(@RequestBody OtpData otpData) throws MessagingException {
        String httpStatus = service.verifyRegistration(otpData);
        ResponseEntity<String> response;
        if(httpStatus.equals("CREATED")){
            response = new ResponseEntity<>("Verification successfull", HttpStatus.CREATED);
        }
        else if(httpStatus.equals("BAD_REQUEST")){
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return response;
    }

    @PutMapping("/resendregisterotp")
    public ResponseEntity<ResendOtpRegisterData> resendRegisterOtp(@RequestBody ResendOtpRegisterData resendOtpRegisterData) throws MessagingException {
        String httpStatus = service.resendRegisterOtp(resendOtpRegisterData);
        ResponseEntity<ResendOtpRegisterData> response;
        if(httpStatus.equals("OK")){
            response = new ResponseEntity<>(resendOtpRegisterData, HttpStatus.OK);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) throws Exception {
        service2.firstrun();
        return service.verify(user);
    }

    @PostMapping("/log-out")
    public ResponseEntity<String> logoutUser(@RequestBody DeauthenticatedJwts deauthenticatedJwts, HttpServletRequest request) {
        ResponseEntity<String> response;
        String authHeader = request.getHeader("Authorization");
        String token= null;
        token = authHeader.substring(7);
        if(!deauthenticatedJwts.getJwt().equals(token)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        repo.save(deauthenticatedJwts);
        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }
}
