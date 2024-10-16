package com.rounak.backend.service;

import com.rounak.backend.model.OtpData;
import com.rounak.backend.model.ResendOtpRegisterData;
import com.rounak.backend.model.Users;
import com.rounak.backend.repo.UserRepo;
import com.rounak.backend.util.EmailUtil;
import com.rounak.backend.util.OtpUtil;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;

    @Autowired
    private OtpUtil otpUtil;

    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    private TwillioService twillioService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Transactional
    public String register(Users user) throws MessagingException {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setVerified(false);
        if(((repo.findByPhone(user.getPhone()) == null) && (repo.findByEmail(user.getEmail()) == null)) || (((repo.findByPhone(user.getPhone()) != null) && (!repo.findByPhone(user.getPhone()).isVerified())) && ((repo.findByEmail(user.getEmail()) != null) && (!repo.findByEmail(user.getEmail()).isVerified())))) {
            String phone_otp = otpUtil.generateOtp();
            String email_otp = otpUtil.generateOtp();
            user.setPhone_otp(phone_otp);
            twillioService.sendSms("+91" + user.getPhone(),phone_otp + " is the OTP for verification of your phone number for THE KOLKATA METRO MASTER registration. The otp is valid for only 5 minutes.");
            user.setPhone_otp_expiry_time(LocalDateTime.now().plusSeconds(300));
            user.setEmail_otp(email_otp);
            emailUtil.sendEmail(user.getEmail(), "Verify your Email", email_otp + " is the OTP for verification of your Email ID for THE KOLKATA METRO MASTER registration. The otp is valid for only 5 minutes.");
            user.setEmail_otp_expiry_time(LocalDateTime.now().plusSeconds(300));
            repo.save(user);
            return "OK";
        }
        else{
            return "BAD_REQUEST";
        }
    }

    @Transactional
    public String verify(Users user) throws Exception {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getPhone(), user.getPassword()));
        if (authentication.isAuthenticated() && (repo.findByPhone(user.getPhone()).isVerified())) {
            return jwtService.generateToken(user.getPhone());
        }
        else{
            throw new Exception("Invalid credentials");
        }
    }

    @Transactional
    public String verifyRegistration(OtpData otpData) throws MessagingException {
        Users user = repo.findByPhone(otpData.getPhone());
        if((user != null) && (!user.isVerified()) && (user.getEmail().equals(otpData.getEmail())) && ((user.getEmail_otp().equals(otpData.getEmail_otp()) && (user.getEmail_otp_expiry_time().isAfter(LocalDateTime.now())))) && ((user.getPhone_otp().equals(otpData.getPhone_otp()) && (user.getPhone_otp_expiry_time().isAfter(LocalDateTime.now()))))){
            user.setVerified(true);
            user.setEmail_otp(null);
            user.setPhone_otp_expiry_time(null);
            user.setPhone_otp(null);
            user.setEmail_otp_expiry_time(null);
            repo.save(user);
            twillioService.sendSms("+91" + user.getPhone(),"Your account for THE KOLKATA METRO MASTER has been registered successfully.");
            emailUtil.sendEmail(user.getEmail(), "Registration successfull", "Your account for THE KOLKATA METRO MASTER has been registered successfully.");
            return "CREATED";
        }
        else{
            if((user == null) || (user.isVerified())){
                return "BAD_REQUEST";
            }
            else {
                return "UNAUTHORIZED";
            }
        }
    }

    @Transactional
    public String resendRegisterOtp(ResendOtpRegisterData resendOtpRegisterData) throws MessagingException {
        Users user = repo.findByPhone(resendOtpRegisterData.getPhone());
        if((user != null) && (user.getEmail().equals(resendOtpRegisterData.getEmail())) && (!user.isVerified())) {
            String phone_otp = otpUtil.generateOtp();
            String email_otp = otpUtil.generateOtp();
            user.setPhone_otp(phone_otp);
            twillioService.sendSms("+91" + user.getPhone(),phone_otp + " is the OTP for verification of your phone number for THE KOLKATA METRO MASTER registration. The otp is valid for only 5 minutes.");
            user.setPhone_otp_expiry_time(LocalDateTime.now().plusSeconds(300));
            user.setEmail_otp(email_otp);
            emailUtil.sendEmail(user.getEmail(), "Verify your Email", email_otp + " is the OTP for verification of your Email ID for THE KOLKATA METRO MASTER registration. The otp is valid for only 5 minutes.");
            user.setEmail_otp_expiry_time(LocalDateTime.now().plusSeconds(300));
            repo.save(user);
            return "OK";
        }
        else{
            return "BAD_REQUEST";
        }
    }

    @Transactional
    public void scheduledDelete() {
        List<Users> users = repo.findAll();
        for (Users user : users) {
            if((!user.isVerified()) && (((user.getEmail_otp_expiry_time() == null) || (user.getEmail_otp_expiry_time().isBefore(LocalDateTime.now()))) || ((user.getPhone_otp_expiry_time() == null) || (user.getPhone_otp_expiry_time().isBefore(LocalDateTime.now()))))){
                repo.delete(user);
            }
        }
    }
}
