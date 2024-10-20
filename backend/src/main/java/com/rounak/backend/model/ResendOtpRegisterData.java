package com.rounak.backend.model;

import lombok.Data;

@Data
public class ResendOtpRegisterData {
    private String email;
    private String phone;
}
