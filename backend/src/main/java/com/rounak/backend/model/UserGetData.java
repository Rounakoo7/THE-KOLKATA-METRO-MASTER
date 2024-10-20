package com.rounak.backend.model;

import lombok.Data;

@Data
public class UserGetData {
    private String phone;
    private String name;
    private String email;
    private int tickets;
}
