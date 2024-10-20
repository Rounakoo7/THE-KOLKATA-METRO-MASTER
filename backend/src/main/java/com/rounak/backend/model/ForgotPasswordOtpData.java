package com.rounak.backend.model;

import lombok.Data;

@Data
public class ForgotPasswordOtpData {
    private String credential;
    private String otp;
    private String password;
}
