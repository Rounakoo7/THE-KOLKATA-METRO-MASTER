package com.rounak.backend.model;

import lombok.Data;
import java.util.Vector;

@Data
public class TicketData {
    private String phone;
    private int fare;
    private int distance;
    private String station1;
    private String station2;
    private int passengers;
    private long duration;
    private Vector<String> interchange_path;

    public TicketData(String phone, int fare, int distance, String station1, String station2, int passengers, long duration, Vector<String> interchange_path) {
        this.phone = phone;
        this.fare = fare;
        this.distance = distance;
        this.station1 = station1;
        this.station2 = station2;
        this.passengers = passengers;
        this.duration = duration;
        this.interchange_path = interchange_path;
    }
}
