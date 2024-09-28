package com.rounak.backend.controller;

import com.rounak.backend.service.FloydWarshallService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FloydWarshallController {

    @Autowired
    private FloydWarshallService service;

    @GetMapping("/fw")
    public String greet(HttpServletRequest request){
        service.firstrun();
        service.pathprint(10, 30);
        return "0";
    }

}