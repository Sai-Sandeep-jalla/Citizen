package com.citizenportal.controller;

import com.citizenportal.dto.SendOtpRequest;
import com.citizenportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.citizenportal.dto.VerifyOtpRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody SendOtpRequest request) {

        return userService.sendOtp(request);

    }
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody VerifyOtpRequest request) {

    return userService.verifyOtp(request);

}
}