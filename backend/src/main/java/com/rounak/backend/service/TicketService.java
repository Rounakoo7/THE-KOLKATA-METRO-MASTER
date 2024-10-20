package com.rounak.backend.service;

import com.rounak.backend.model.TicketData;
import com.rounak.backend.model.Tickets;
import com.rounak.backend.model.Users;
import com.rounak.backend.repo.UserRepo;
import com.rounak.backend.util.EmailUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

class TicketBooking_dateSortingComparator implements Comparator<Tickets> {
    @Override
    public int compare(Tickets t1, Tickets t2){
        return t1.getBooking_time().compareTo(t2.getBooking_time());
    }
}

@Service
public class TicketService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JWTService service1;

    @Autowired
    private FloydWarshallService service2;

    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    private TwillioService twillioService;

    @Transactional
    public String saveTicket(TicketData tickets, HttpServletRequest request) throws MessagingException {
        String authHeader = request.getHeader("Authorization");
        String token;
        String phone = null;
        token = authHeader.substring(7);
        phone = service1.extractPhone(token);
        if(!phone.equals(tickets.getPhone())){
            return "UNAUTHORIZED";
        }
        if(repo.findByPhone(tickets.getPhone()) != null){
            Users user = repo.findByPhone(tickets.getPhone());
            List<Tickets> temp = user.getTickets();
            LocalDateTime booking_time = LocalDateTime.now();
            for (Tickets value : temp) {
                if (value.getBooking_time().isEqual(booking_time)) {
                    return "BAD_REQUEST";
                }
            }
            Tickets ticket = new Tickets();
            ticket.setFare(tickets.getFare());
            ticket.setDistance(tickets.getDistance());
            ticket.setPassengers(tickets.getPassengers());
            ticket.setBooking_time(booking_time);
            ticket.setExpiry_time(booking_time.plusSeconds(tickets.getDuration()));
            ticket.setStation1(tickets.getStation1());
            ticket.setStation2(tickets.getStation2());
            ticket.setInterchange_path(service2.interchangepathtostring(tickets.getInterchange_path()));
            user.getTickets().add(ticket);
            repo.save(user);
            twillioService.sendSms("+91" + user.getPhone(),"Ticket booked from " + ticket.getStation1() + " to " + ticket.getStation2() + " via " + ticket.getInterchange_path().replace(",", " -> ") + ".\nFare : Rs " + ticket.getFare() + "\nDistance : " + ticket.getDistance() + " Km(s)\nNumber of Passengers : " + ticket.getPassengers() + "\nBooking time : " + ticket.getBooking_time() + "\nExpiry time : " + ticket.getExpiry_time());
            emailUtil.sendEmail(user.getEmail(), "Ticket booked successfully", "Ticket booked from " + ticket.getStation1() + " to " + ticket.getStation2() + " via " + ticket.getInterchange_path().replace(",", " -> ") + ".\nFare : Rs " + ticket.getFare() + "\nDistance : " + ticket.getDistance() + " Km(s)\nNumber of Passengers : " + ticket.getPassengers() + "\nBooking time : " + ticket.getBooking_time() + "\nExpiry time : " + ticket.getExpiry_time());
            return "CREATED";
        }
        else {
            return "BAD_REQUEST";
        }
    }

    @Transactional
    public List<Tickets> getUserTickets(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token;
        String phone = null;
        token = authHeader.substring(7);
        phone = service1.extractPhone(token);
        Users user = repo.findByPhone(phone);
        List<Tickets> tickets = user.getTickets();
        int size = tickets.size();
        for (int i = 0; i < size; i++) {
            if (tickets.get(i).getExpiry_time().isBefore(LocalDateTime.now())) {
                user.getTickets().remove(i);
                i--;
                size--;
            }
        }
        repo.save(user);
        user.getTickets().sort((new TicketBooking_dateSortingComparator()).reversed());
        return user.getTickets();
    }

    @Transactional
    public void scheduledDelete() {
        List<Users> users = repo.findAll();
        for(Users value1 : users) {
            List<Tickets> tickets = value1.getTickets();
            int size = tickets.size();
            for (int i = 0; i < size; i++) {
                if (tickets.get(i).getExpiry_time().isBefore(LocalDateTime.now())) {
                    value1.getTickets().remove(i);
                    i--;
                    size--;
                }
            }
            repo.save(value1);
        }
    }
}
