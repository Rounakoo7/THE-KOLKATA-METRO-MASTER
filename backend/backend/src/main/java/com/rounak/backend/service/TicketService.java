package com.rounak.backend.service;

import com.rounak.backend.model.TicketData;
import com.rounak.backend.model.Tickets;
import com.rounak.backend.model.Users;
import com.rounak.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JWTService service;

    public String saveTicket(TicketData tickets) {
        String token;
        String phone = null;
        token = tickets.getJwt().substring(7);
        phone = service.extractPhone(token);
        if(!phone.equals(tickets.getPhone())){
            return "UNAUTHORIZED";
        }
        if(repo.findByPhone(tickets.getPhone()) != null){
            Users user = repo.findByPhone(tickets.getPhone());
            List<Tickets> temp = user.getTickets();
            for (Tickets value : temp) {
                if (value.getBooking_time().isEqual(tickets.getBooking_time())) {
                    return "BAD_REQUEST";
                }
            }
            Tickets ticket = new Tickets();
            ticket.setFare(tickets.getFare());
            ticket.setDistance(tickets.getDistance());
            ticket.setPassengers(tickets.getPassengers());
            ticket.setBooking_time(tickets.getBooking_time());
            ticket.setExpiry_time(tickets.getExpiry_time());
            ticket.setStation1(tickets.getStation1());
            ticket.setStation2(tickets.getStation2());
            user.getTickets().add(ticket);
            repo.save(user);
            return "CREATED";
        }
        else {
            return "BAD_REQUEST";
        }
    }
}
