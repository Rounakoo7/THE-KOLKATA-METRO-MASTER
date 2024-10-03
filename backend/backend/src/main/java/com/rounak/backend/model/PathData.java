package com.rounak.backend.model;

import lombok.Data;
import java.util.Vector;

@Data
public class PathData {
    private float avgspeed;
    private int nodecount;
    private int distance;
    private long time;
    private int fare;
    private Vector<String> path;
    private Boolean notexists;
    public PathData(float avgspeed, int nodecount, int distance, long time, int fare, Vector<String> path) {
        this.avgspeed = avgspeed;
        this.nodecount = nodecount;
        this.distance = distance;
        this.time = time;
        this.fare = fare;
        this.path = path;
        this.notexists = false;
    }

    public PathData() {
        this.notexists = true;
    }
}
