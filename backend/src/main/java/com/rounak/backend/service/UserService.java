package com.rounak.backend.service;

import com.rounak.backend.model.*;
import com.rounak.backend.repo.DeauthenticatedJwtRepo;
import com.rounak.backend.repo.UserRepo;
import com.rounak.backend.util.EmailUtil;
import com.rounak.backend.util.OtpUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
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
    private DeauthenticatedJwtRepo deauthenticatedJwtRepo;

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
    public String verifyRegistration(RegisterOtpData registerOtpData) throws MessagingException {
        Users user = repo.findByPhone(registerOtpData.getPhone());
        if((user != null) && (!user.isVerified()) && (user.getEmail().equals(registerOtpData.getEmail())) && ((user.getEmail_otp().equals(registerOtpData.getEmail_otp()) && (user.getEmail_otp_expiry_time().isAfter(LocalDateTime.now())))) && ((user.getPhone_otp().equals(registerOtpData.getPhone_otp()) && (user.getPhone_otp_expiry_time().isAfter(LocalDateTime.now()))))){
            user.setVerified(true);
            user.setEmail_otp(null);
            user.setPhone_otp_expiry_time(null);
            user.setPhone_otp(null);
            user.setEmail_otp_expiry_time(null);
            user.setPhone_update(null);
            user.setEmail_update(null);
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
    public String forgotPassword(ForgotPasswordData forgotPasswordData) throws MessagingException {
        Users user1 = repo.findByPhone(forgotPasswordData.getCredential());
        Users user2 = repo.findByEmail(forgotPasswordData.getCredential());
        if((user1 != null) && (user1.isVerified())) {
            String otp = otpUtil.generateOtp();
            user1.setPhone_otp(otp);
            twillioService.sendSms("+91" + user1.getPhone(),otp + " is the OTP for THE KOLKATA METRO MASTER password change. The otp is valid for only 5 minutes.");
            user1.setPhone_otp_expiry_time(LocalDateTime.now().plusSeconds(300));
            user1.setEmail_otp(otp);
            emailUtil.sendEmail(user1.getEmail(), "OTP for password change", otp + " is the OTP for THE KOLKATA METRO MASTER password change. The otp is valid for only 5 minutes.");
            user1.setEmail_otp_expiry_time(user1.getPhone_otp_expiry_time());
            repo.save(user1);
            return "OK";
        }
        else if((user2 != null) && (user2.isVerified())) {
            String otp = otpUtil.generateOtp();
            user2.setPhone_otp(otp);
            twillioService.sendSms("+91" + user2.getPhone(),otp + " is the OTP for THE KOLKATA METRO MASTER password change. The otp is valid for only 5 minutes.");
            user2.setPhone_otp_expiry_time(LocalDateTime.now().plusSeconds(300));
            user2.setEmail_otp(otp);
            emailUtil.sendEmail(user2.getEmail(), "OTP for password change", otp + " is the OTP for THE KOLKATA METRO MASTER password change. The otp is valid for only 5 minutes.");
            user2.setEmail_otp_expiry_time(user2.getPhone_otp_expiry_time());
            repo.save(user2);
            return "OK";
        }
        else{
            return "BAD_REQUEST";
        }
    }

    @Transactional
    public String verifyAndChangePassword(ForgotPasswordOtpData forgotPasswordOtpData) throws MessagingException {
        Users user1 = repo.findByPhone(forgotPasswordOtpData.getCredential());
        Users user2 = repo.findByEmail(forgotPasswordOtpData.getCredential());
        if((user1 != null) && (user1.isVerified()) && ((user1.getEmail_otp().equals(forgotPasswordOtpData.getOtp()) && (user1.getEmail_otp_expiry_time().isAfter(LocalDateTime.now())))) && ((user1.getPhone_otp().equals(forgotPasswordOtpData.getOtp()) && (user1.getPhone_otp_expiry_time().isAfter(LocalDateTime.now()))))){
            user1.setPassword(encoder.encode(forgotPasswordOtpData.getPassword()));
            user1.setEmail_otp(null);
            user1.setPhone_otp_expiry_time(null);
            user1.setPhone_otp(null);
            user1.setEmail_otp_expiry_time(null);
            repo.save(user1);
            twillioService.sendSms("+91" + user1.getPhone(),"The password for your account for THE KOLKATA METRO MASTER has been changed successfully.");
            emailUtil.sendEmail(user1.getEmail(), "Password changed successfully", "The password for your account for THE KOLKATA METRO MASTER has been changed successfully.");
            return "OK";
        }
        else if((user2 != null) && (user2.isVerified()) && ((user2.getEmail_otp().equals(forgotPasswordOtpData.getOtp()) && (user2.getEmail_otp_expiry_time().isAfter(LocalDateTime.now())))) && ((user2.getPhone_otp().equals(forgotPasswordOtpData.getOtp()) && (user2.getPhone_otp_expiry_time().isAfter(LocalDateTime.now()))))){
            user2.setPassword(encoder.encode(forgotPasswordOtpData.getPassword()));
            user2.setEmail_otp(null);
            user2.setPhone_otp_expiry_time(null);
            user2.setPhone_otp(null);
            user2.setEmail_otp_expiry_time(null);
            repo.save(user2);
            twillioService.sendSms("+91" + user2.getPhone(),"The password for your account for THE KOLKATA METRO MASTER has been changed successfully.");
            emailUtil.sendEmail(user2.getEmail(), "Password changed successfully", "The password for your account for THE KOLKATA METRO MASTER has been changed successfully.");
            return "OK";
        }
        else{
            if(((user1 == null) && (user2 == null)) || ((user1 != null) && (!user1.isVerified())) || ((user2 != null) && (!user2.isVerified()))){
                return "BAD_REQUEST";
            }
            else {
                return "UNAUTHORIZED";
            }
        }
    }

    @Transactional
    public String changePhone(ChangePhoneData changePhoneData, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token;
        String phone = null;
        token = authHeader.substring(7);
        phone = jwtService.extractPhone(token);
        Users user1 = repo.findByPhone(phone);
        Users user2 = repo.findByPhone(changePhoneData.getPhone());
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(phone, changePhoneData.getPassword()));
        if((user1 == null) || (!user1.isVerified()) || ((user2 != null) && (user2.isVerified()))){
            return "BAD_REQUEST";
        }
        else if(!authentication.isAuthenticated()) {
            return "UNAUTHORIZED";
        }
        else{
            String otp = otpUtil.generateOtp();
            user1.setPhone_otp(otp);
            user1.setPhone_update(changePhoneData.getPhone());
            twillioService.sendSms("+91" + changePhoneData.getPhone(),otp + " is the OTP for THE KOLKATA METRO MASTER Phone Number change. The otp is valid for only 5 minutes.");
            user1.setPhone_otp_expiry_time(LocalDateTime.now().plusSeconds(300));
            repo.save(user1);
            return "OK";
        }
    }

    @Transactional
    public String verifyChangePhone(ChangePhoneOrEmailOtpData changePhoneOrEmailOtpData, HttpServletRequest request) throws MessagingException {
        String authHeader = request.getHeader("Authorization");
        String token;
        String phone = null;
        token = authHeader.substring(7);
        phone = jwtService.extractPhone(token);
        Users user1 = repo.findByPhone(phone);
        if((user1 == null) || (!user1.isVerified())){
            return "BAD_REQUEST";
        }
        Users user2 = repo.findByPhone(user1.getPhone_update());
        if((user2 != null) && (user2.isVerified())){
            user1.setPhone_otp(null);
            user1.setPhone_otp_expiry_time(null);
            user1.setPhone_update(null);
            repo.save(user1);
            return "BAD_REQUEST";
        }
        if((user1.getPhone_otp().equals(changePhoneOrEmailOtpData.getOtp()) && (user1.getPhone_otp_expiry_time().isAfter(LocalDateTime.now())))){
            user1.setPhone_otp(null);
            user1.setPhone_otp_expiry_time(null);
            user1.setPhone(user1.getPhone_update());
            user1.setPhone_update(null);
            repo.save(user1);
            twillioService.sendSms("+91" + user1.getPhone(),"The Phone Number for your account for THE KOLKATA METRO MASTER has been changed successfully.");
            emailUtil.sendEmail(user1.getEmail(), "Phone Number changed successfully", "The Phone Number for your account for THE KOLKATA METRO MASTER has been changed successfully.");
            DeauthenticatedJwts deauthenticatedJwts = new DeauthenticatedJwts();
            deauthenticatedJwts.setJwt(token);
            deauthenticatedJwtRepo.save(deauthenticatedJwts);
            return jwtService.generateToken(user1.getPhone());
        }
        else{
            return "UNAUTHORIZED";
        }
    }

    @Transactional
    public String changeEmail(ChangeEmailData changeEmailData, HttpServletRequest request) throws MessagingException {
        String authHeader = request.getHeader("Authorization");
        String token;
        String phone = null;
        token = authHeader.substring(7);
        phone = jwtService.extractPhone(token);
        Users user1 = repo.findByPhone(phone);
        Users user2 = repo.findByEmail(changeEmailData.getEmail());
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(phone, changeEmailData.getPassword()));
        if((user1 == null) || (!user1.isVerified()) || ((user2 != null) && (user2.isVerified()))){
            return "BAD_REQUEST";
        }
        else if(!authentication.isAuthenticated()) {
            return "UNAUTHORIZED";
        }
        else{
            String otp = otpUtil.generateOtp();
            user1.setEmail_otp(otp);
            user1.setEmail_update(changeEmailData.getEmail());
            emailUtil.sendEmail(changeEmailData.getEmail(), "OTP for Email ID change", otp + " is the OTP for THE KOLKATA METRO MASTER Email ID change. The otp is valid for only 5 minutes.");
            user1.setEmail_otp_expiry_time(LocalDateTime.now().plusSeconds(300));
            repo.save(user1);
            return "OK";
        }
    }

    @Transactional
    public String verifyChangeEmail(ChangePhoneOrEmailOtpData changePhoneorEmailOtpData, HttpServletRequest request) throws MessagingException {
        String authHeader = request.getHeader("Authorization");
        String token;
        String phone = null;
        token = authHeader.substring(7);
        phone = jwtService.extractPhone(token);
        Users user1 = repo.findByPhone(phone);
        if((user1 == null) || (!user1.isVerified())){
            return "BAD_REQUEST";
        }
        Users user2 = repo.findByEmail(user1.getEmail_update());
        if((user2 != null) && (user2.isVerified())){
            user1.setEmail_otp(null);
            user1.setEmail_otp_expiry_time(null);
            user1.setEmail_update(null);
            repo.save(user1);
            return "BAD_REQUEST";
        }
        if((user1.getEmail_otp().equals(changePhoneorEmailOtpData.getOtp()) && (user1.getEmail_otp_expiry_time().isAfter(LocalDateTime.now())))){
            user1.setEmail_otp(null);
            user1.setEmail_otp_expiry_time(null);
            user1.setEmail(user1.getEmail_update());
            user1.setEmail_update(null);
            repo.save(user1);
            twillioService.sendSms("+91" + user1.getPhone(),"The Email ID for your account for THE KOLKATA METRO MASTER has been changed successfully.");
            emailUtil.sendEmail(user1.getEmail(), "Email ID changed successfully", "The Email ID for your account for THE KOLKATA METRO MASTER has been changed successfully.");
            return "OK";
        }
        else{
            return "UNAUTHORIZED";
        }
    }

    @Transactional
    public void scheduledDelete() {
        List<Users> users = repo.findAll();
        for (Users user : users) {
            if((!user.isVerified()) && (((user.getEmail_otp_expiry_time() == null) || (user.getEmail_otp_expiry_time().isBefore(LocalDateTime.now()))) || ((user.getPhone_otp_expiry_time() == null) || (user.getPhone_otp_expiry_time().isBefore(LocalDateTime.now()))))){
                repo.delete(user);
            }
            else if(user.isVerified()){
                if ((user.getPhone_otp_expiry_time() != null) && (user.getPhone_otp_expiry_time().isBefore(LocalDateTime.now()))) {
                    user.setPhone_otp(null);
                    user.setPhone_otp_expiry_time(null);
                    user.setPhone_update(null);
                    repo.save(user);
                }
                if ((user.getEmail_otp_expiry_time() != null) && (user.getEmail_otp_expiry_time().isBefore(LocalDateTime.now()))) {
                    user.setEmail_otp(null);
                    user.setEmail_otp_expiry_time(null);
                    user.setEmail_update(null);
                    repo.save(user);
                }
            }
        }
    }
}