package com.rounak.backend.controller;

import com.rounak.backend.model.TicketData;
import com.rounak.backend.model.Tickets;
import com.rounak.backend.service.TicketService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TicketController {

    @Autowired
    TicketService service;

    @PostMapping("/issueticket")
    public ResponseEntity<TicketData> issueTicket(@RequestBody TicketData tickets, HttpServletRequest request){
        String httpStatus = service.saveTicket(tickets, request);
        ResponseEntity<TicketData> response;
        if(httpStatus.equals("CREATED")){
            response = new ResponseEntity<>(tickets, HttpStatus.CREATED);
        }
        else if(httpStatus.equals("UNAUTHORIZED")){
            response = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @GetMapping("/showtickets")
    public List<Tickets> showTickets(HttpServletRequest request){
        return service.getUserTickets(request);
    }
}
