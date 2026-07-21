package com.otpservices.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class SmsService {

    @Value("${fast2sms.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public SmsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void sendSms(String phoneNumber, String otp) {

        String url = "https://www.fast2sms.com/dev/bulkV2";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", apiKey);

       Map<String, Object> body = new HashMap<>();

        body.put("route", "q");
        body.put("message", "Your OTP is " + otp);
        body.put("numbers", phoneNumber);
        
        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        try {

    String response = restTemplate.postForObject(url, request, String.class);

    System.out.println("Fast2SMS Response:");
    System.out.println(response);

      } catch (Exception exception) {

    exception.printStackTrace();

    if (exception instanceof org.springframework.web.client.HttpStatusCodeException ex) {
        System.out.println("==================================");
        System.out.println("Status Code : " + ex.getStatusCode());
        System.out.println("Response    : " + ex.getResponseBodyAsString());
        System.out.println("==================================");
    }

    throw new RuntimeException("Failed to send OTP", exception);
        }
    }
}