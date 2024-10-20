package com.rounak.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Tickets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private int fare;
    @Column(nullable = false)
    private int distance;
    @Column(nullable = false)
    private String station1;
    @Column(nullable = false)
    private String station2;
    @Column(nullable = false)
    private int passengers;
    @Column(nullable = false)
    private LocalDateTime booking_time;
    @Column(nullable = false)
    private LocalDateTime expiry_time;
    @Column(nullable = false)
    private String interchange_path;
}
