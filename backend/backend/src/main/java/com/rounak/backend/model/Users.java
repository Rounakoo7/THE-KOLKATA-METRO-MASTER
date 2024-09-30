package com.rounak.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Users {
    @Id
    private String phone;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;

}
