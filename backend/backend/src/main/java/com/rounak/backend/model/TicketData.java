package com.rounak.backend.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TicketData {
    private String phone;
    private int fare;
    private int distance;
    private String station1;
    private String station2;
    private int passengers;
    private long duration;
}
