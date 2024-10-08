package com.rounak.backend.config;

import com.rounak.backend.model.DeauthenticatedJwts;
import com.rounak.backend.model.Tickets;
import com.rounak.backend.model.Users;
import com.rounak.backend.repo.DeauthenticatedJwtRepo;
import com.rounak.backend.repo.UserRepo;
import com.rounak.backend.service.JWTService;
import com.rounak.backend.service.TicketService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import java.security.SignatureException;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
@EnableScheduling
@Slf4j
public class SchedulerConfig {

    @Autowired
    private DeauthenticatedJwtRepo repo;

    @Autowired
    private TicketService service1;

    @Autowired
    private JWTService service2;

    @Scheduled(fixedDelay = 3600000)
    public void deleteExpiredTickets() throws InterruptedException{
        service1.scheduledDelete();
    }

    @Scheduled(fixedDelay = 3600000)
    public void deleteExpiredBlackList() throws InterruptedException{
        List<DeauthenticatedJwts> deauthenticatedJwts = repo.findAll();
        for (DeauthenticatedJwts deauthenticatedJwt : deauthenticatedJwts) {
            try {
                service2.isTokenExpired(deauthenticatedJwt.getJwt());
            } catch (ExpiredJwtException e) {
                repo.delete(deauthenticatedJwt);
            }
        }
    }
}
