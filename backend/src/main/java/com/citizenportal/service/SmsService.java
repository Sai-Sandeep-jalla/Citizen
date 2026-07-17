package com.citizenportal.service;

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
        try {

    String url = "https://www.fast2sms.com/dev/otp/send";

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set("Authorization", apiKey);

    Map<String, Object> body = new HashMap<>();
    body.put("mobile", phoneNumber);
    body.put("otp", otp);

    HttpEntity<Map<String, Object>> request =
            new HttpEntity<>(body, headers);

    System.out.println("Inside Fast2SMS sendSms()");
    String response = restTemplate.postForObject(url, request, String.class);
    System.out.println("Fast2SMS Response: " + response);
    }
    catch (Exception e) {
    e.printStackTrace();
}
}
}
