package com.rounak.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Users {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String phone;
    private String email;
    private String password;

}
