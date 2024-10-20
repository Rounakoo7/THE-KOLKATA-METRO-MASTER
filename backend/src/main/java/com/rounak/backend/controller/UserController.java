package com.rounak.backend.controller;

import com.rounak.backend.model.*;
import com.rounak.backend.repo.DeauthenticatedJwtRepo;
import com.rounak.backend.repo.UserRepo;
import com.rounak.backend.service.FloydWarshallService;
import com.rounak.backend.service.JWTService;
import com.rounak.backend.service.TwillioService;
import com.rounak.backend.service.UserService;
import com.rounak.backend.util.EmailUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService service1;

    @Autowired
    private FloydWarshallService service2;

    @Autowired
    private JWTService service3;

    @Autowired
    private DeauthenticatedJwtRepo repo1;

    @Autowired
    private UserRepo repo2;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    private TwillioService twillioService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Users user) throws MessagingException {
        String httpStatus = service1.register(user);
        ResponseEntity<String> response;
        if(httpStatus.equals("OK")){
            response = new ResponseEntity<>("OTPs have been sent to the Email ID and Phone Number for verification", HttpStatus.OK);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/verifyregistration")
    public ResponseEntity<String> verifyRegistration(@RequestBody RegisterOtpData registerOtpData) throws MessagingException {
        String httpStatus = service1.verifyRegistration(registerOtpData);
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
    public ResponseEntity<String> resendRegisterOtp(@RequestBody ResendOtpRegisterData resendOtpRegisterData) throws MessagingException {
        String httpStatus = service1.resendRegisterOtp(resendOtpRegisterData);
        ResponseEntity<String> response;
        if(httpStatus.equals("OK")){
            response = new ResponseEntity<>("OTPs have been sent to the Email ID and Phone Number for verification", HttpStatus.OK);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/forgotpassword")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordData forgotPasswordData) throws MessagingException {
        String httpStatus = service1.forgotPassword(forgotPasswordData);
        ResponseEntity<String> response;
        if(httpStatus.equals("OK")){
            response = new ResponseEntity<>("An OTP has been sent to both the Email ID and Phone Number for password change", HttpStatus.OK);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/verifyandchangepassword")
    public ResponseEntity<String> verifyAndChangePassword(@RequestBody ForgotPasswordOtpData forgotPasswordOtpData) throws MessagingException {
        String httpStatus = service1.verifyAndChangePassword(forgotPasswordOtpData);
        ResponseEntity<String> response;
        if(httpStatus.equals("OK")){
            response = new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
        }
        else if(httpStatus.equals("BAD_REQUEST")){
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return response;
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) throws Exception {
        service2.firstrun();
        return service1.verify(user);
    }

    @PostMapping("/log-out")
    @Transactional
    public ResponseEntity<String> logoutUser(@RequestBody DeauthenticatedJwts deauthenticatedJwts, HttpServletRequest request) {
        ResponseEntity<String> response;
        String authHeader = request.getHeader("Authorization");
        String token= null;
        token = authHeader.substring(7);
        if(!deauthenticatedJwts.getJwt().equals(token)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        repo1.save(deauthenticatedJwts);
        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }

    @GetMapping("/getuser")
    @Transactional
    public UserGetData getUser(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        String token;
        String phone = null;
        token = authHeader.substring(7);
        phone = service3.extractPhone(token);
        Users user = repo2.findByPhone(phone);
        UserGetData userGetData = new UserGetData();
        userGetData.setName(user.getName());
        userGetData.setPhone(user.getPhone());
        userGetData.setEmail(user.getEmail());
        userGetData.setTickets(user.getTickets().size());
        return userGetData;
    }

    @PostMapping("/deleteuser")
    @Transactional
    public ResponseEntity<String> deleteUser(@RequestBody PasswordData passwordData, HttpServletRequest request) throws MessagingException {
        String authHeader = request.getHeader("Authorization");
        String token;
        String phone = null;
        token = authHeader.substring(7);
        phone = service3.extractPhone(token);
        Users user = repo2.findByPhone(phone);
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(phone, passwordData.getPassword()));
        if(!authentication.isAuthenticated()){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        DeauthenticatedJwts deauthenticatedJwts = new DeauthenticatedJwts();
        deauthenticatedJwts.setJwt(token);
        repo2.delete(user);
        repo1.save(deauthenticatedJwts);
        twillioService.sendSms("+91" + user.getPhone(),"Your account for THE KOLKATA METRO MASTER has been deactivated successfully.");
        emailUtil.sendEmail(user.getEmail(), "Account deactivation successfull", "Your account for THE KOLKATA METRO MASTER has been deactivated successfully.");
        return new ResponseEntity<>("User deleted and logged out successfully", HttpStatus.OK);
    }

    @PutMapping("/changephone")
    public ResponseEntity<String> changePhone(@RequestBody ChangePhoneData changePhoneData, HttpServletRequest request) throws MessagingException {
        String httpStatus = service1.changePhone(changePhoneData, request);
        ResponseEntity<String> response;
        if(httpStatus.equals("OK")){
            response = new ResponseEntity<>("An OTP has been sent to the new Phone Number for Phone Number change", HttpStatus.OK);
        }
        else if(httpStatus.equals("UNAUTHORIZED")){
            response = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/verifychangephone")
    public ResponseEntity<String> verifyChangePhone(@RequestBody ChangePhoneOrEmailOtpData changePhoneOrEmailOtpData, HttpServletRequest request) throws MessagingException {
        String httpStatus = service1.verifyChangePhone(changePhoneOrEmailOtpData, request);
        ResponseEntity<String> response;
        if(httpStatus.equals("UNAUTHORIZED")){
            response = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else if(httpStatus.equals("BAD_REQUEST")){
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            response = new ResponseEntity<>(httpStatus, HttpStatus.OK);
        }
        return response;
    }

    @PutMapping("/changeemail")
    public ResponseEntity<String> changeEmail(@RequestBody ChangeEmailData changeEmailData, HttpServletRequest request) throws MessagingException {
        String httpStatus = service1.changeEmail(changeEmailData, request);
        ResponseEntity<String> response;
        if(httpStatus.equals("OK")){
            response = new ResponseEntity<>("An OTP has been sent to the new Email ID for Email ID change", HttpStatus.OK);
        }
        else if(httpStatus.equals("UNAUTHORIZED")){
            response = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/verifychangeemail")
    public ResponseEntity<String> verifyChangeEmail(@RequestBody ChangePhoneOrEmailOtpData changePhoneOrEmailOtpData, HttpServletRequest request) throws MessagingException {
        String httpStatus = service1.verifyChangeEmail(changePhoneOrEmailOtpData, request);
        ResponseEntity<String> response;
        if(httpStatus.equals("OK")){
            response = new ResponseEntity<>("Email ID changed successfully", HttpStatus.OK);
        }
        else if(httpStatus.equals("BAD_REQUEST")){
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return response;
    }
}

