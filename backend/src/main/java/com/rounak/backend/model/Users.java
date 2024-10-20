package com.rounak.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, unique = true)
    private String phone;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    private String phone_otp;
    private String email_otp;
    private LocalDateTime phone_otp_expiry_time;
    private LocalDateTime email_otp_expiry_time;
    private String phone_update;
    private String email_update;
    @Column(nullable = false)
    private boolean verified;
    @OneToMany(cascade = {CascadeType.ALL}, targetEntity = Tickets.class, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "users_id", referencedColumnName = "id")
    private List<Tickets> tickets = new ArrayList<>();
}
