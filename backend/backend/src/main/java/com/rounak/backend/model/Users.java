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
    private String phone;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    //@Column(nullable = false)
    private String phone_otp;
    //@Column(nullable = false)
    private String email_otp;
    //@Column(nullable = false)
    private LocalDateTime phone_otp_expiry_time;
    //@Column(nullable = false)
    private LocalDateTime email_otp_expiry_time;
    @Column(nullable = false)
    private boolean verified;
    @OneToMany(cascade = {CascadeType.ALL}, targetEntity = Tickets.class, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "users_phone", referencedColumnName = "phone")
    private List<Tickets> tickets = new ArrayList<>();
}
