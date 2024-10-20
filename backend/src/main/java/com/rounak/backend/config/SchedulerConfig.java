package com.rounak.backend.config;

import com.rounak.backend.service.*;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
@Slf4j
public class SchedulerConfig {

    @Autowired
    private TicketService service1;

    @Autowired
    private JWTService service2;

    @Autowired
    private UserService service3;

    @Scheduled(fixedDelay = 3600000)
    public void deleteExpiredTickets() throws InterruptedException{
        service1.scheduledDelete();
    }

    @Scheduled(fixedDelay = 3600000)
    public void deleteExpiredBlackList() throws InterruptedException{
        service2.scheduledDelete();
    }

    @Scheduled(fixedDelay = 3600000)
    public void deleteUnverifiedExpiredUsers() throws MessagingException {
        service3.scheduledDelete();
    }
}
