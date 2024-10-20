package com.rounak.backend.controller;

import com.rounak.backend.model.PathData;
import com.rounak.backend.model.StationData;
import com.rounak.backend.service.FloydWarshallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FloydWarshallController {

    @Autowired
    private FloydWarshallService service;

    @PostMapping("/findpath")
    @Transactional
    public ResponseEntity<PathData> findPath(@RequestBody StationData stationData){
        PathData pathData = service.pathprint(stationData);
        ResponseEntity<PathData> response;
        if(pathData.getNotexists()){
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            response = new ResponseEntity<>(pathData, HttpStatus.CREATED);
        }
        return response;
    }

}