package com.rounak.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class TwillioServiceImpl implements TwillioService {

    @Value("${app.twillio.accountSID}")
    private String ACCOUNT_SID;

    @Value("${app.twillio.authToken}")
    private String AUTH_TOKEN;

    @Value("${app.twillio.fromPhoneNo}")
    private String FROM;

    @Override
    public void sendSms(String to, String body) {
        try {
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
            Message message = Message.creator(new PhoneNumber(to), new PhoneNumber(FROM), body) // to:to which no  you want to send sms
                    .create();
            System.out.println(to);
        }catch(Exception e) {
            e.printStackTrace();
        }
    }
}