package com.rounak.backend.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Vector;

@Data
public class TicketViewData {
    private int id;
    private int fare;
    private int distance;
    private String station1;
    private String station2;
    private int passengers;
    private LocalDateTime booking_time;
    private LocalDateTime expiry_time;
    private String[] interchange_path;

    public TicketViewData(int id, int fare, int distance, String station1, String station2, int passengers, LocalDateTime booking_time, LocalDateTime expiry_time, String[] interchange_path) {
        this.id = id;
        this.fare = fare;
        this.distance = distance;
        this.station1 = station1;
        this.station2 = station2;
        this.passengers = passengers;
        this.booking_time = booking_time;
        this.expiry_time = expiry_time;
        this.interchange_path = interchange_path;
    }
}
