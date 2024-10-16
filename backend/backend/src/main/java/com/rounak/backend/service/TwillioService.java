package com.rounak.backend.service;

public interface TwillioService {
    public void sendSms(String to, String body);
}