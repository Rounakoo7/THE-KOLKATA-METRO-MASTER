package com.rounak.backend.model;

import lombok.Data;

@Data
public class ChangeEmailOtpData {
    private String otp;
    private String email;
}
