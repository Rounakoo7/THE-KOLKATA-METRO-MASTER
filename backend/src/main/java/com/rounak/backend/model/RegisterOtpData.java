package com.rounak.backend.model;

import lombok.Data;

@Data
public class RegisterOtpData {
    private String phone;
    private String email;
    private String phone_otp;
    private String email_otp;
}
