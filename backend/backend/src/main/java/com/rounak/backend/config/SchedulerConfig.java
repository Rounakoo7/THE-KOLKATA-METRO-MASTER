package com.rounak.backend.config;

import com.rounak.backend.model.Tickets;
import com.rounak.backend.model.Users;
import com.rounak.backend.repo.UserRepo;
import com.rounak.backend.service.TicketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
@EnableScheduling
@Slf4j
public class SchedulerConfig {

    @Autowired
    private UserRepo repo;

    @Autowired
    private TicketService service;

    @Scheduled(fixedDelay = 3600000)
    public void deleteExpiredTickets() throws InterruptedException{
        service.scheduledDelete();
    }
}
