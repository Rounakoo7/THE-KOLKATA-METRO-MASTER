package com.rounak.backend.controller;

import com.rounak.backend.model.*;
import com.rounak.backend.service.FloydWarshallService;
import com.rounak.backend.service.JWTService;
import com.rounak.backend.service.TicketService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TicketController {

    @Autowired
    private TicketService service1;

    @Autowired
    private FloydWarshallService service2;

    @Autowired
    private JWTService service3;

    @PostMapping("/getticketdata")
    @Transactional
    public ResponseEntity<TicketData> getTicketData(@RequestBody StationTicketData stationTicketData, HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        String token;
        String phone = null;
        token = authHeader.substring(7);
        phone = service3.extractPhone(token);
        StationData stationData = new StationData();
        stationData.setStation1(stationTicketData.getStation1());
        stationData.setStation2(stationTicketData.getStation2());
        PathData pathData = service2.pathprint(stationData);
        ResponseEntity<TicketData> response;
        if(pathData.getNotexists()){
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            TicketData ticketData = new TicketData(phone, pathData.getFare() * stationTicketData.getPassengers(), pathData.getDistance(), stationTicketData.getStation1(), stationTicketData.getStation2(),stationTicketData.getPassengers(), pathData.getTime() * 2, service2.interchangepathprint(pathData.getPath()));
            response = new ResponseEntity<>(ticketData, HttpStatus.CREATED);
        }
        return response;
    }

    @PostMapping("/issueticket")
    public ResponseEntity<TicketData> issueTicket(@RequestBody TicketData tickets, HttpServletRequest request) throws MessagingException {
        String httpStatus = service1.saveTicket(tickets, request);
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
    public List<TicketViewData> showTickets(HttpServletRequest request){
        List<Tickets> repotickets = service1.getUserTickets(request);
        List<TicketViewData> tickets = new ArrayList<>();
        for(int i = 0; i < repotickets.size(); i++){
            Tickets repoticket = repotickets.get(i);
            String[] interchange_path;
            if(repoticket.getInterchange_path().equals("NULL")){
                interchange_path = new String[1];
                interchange_path[0] = "NULL";
            }
            else {
                interchange_path = repoticket.getInterchange_path().split(",");
            }
            TicketViewData ticketViewData = new TicketViewData(repoticket.getId(), repoticket.getFare(), repoticket.getDistance(), repoticket.getStation1(), repoticket.getStation2(), repoticket.getPassengers(), repoticket.getBooking_time(), repoticket.getExpiry_time(), interchange_path);
            tickets.add(i,ticketViewData);
        }
        return tickets;
    }
}
