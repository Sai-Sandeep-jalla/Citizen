package com.otpservices.controller;

import com.otpservices.dto.request.ResetPasswordRequest;
import com.otpservices.dto.request.SendOtpRequest;
import com.otpservices.dto.request.VerifyOtpRequest;
import com.otpservices.dto.response.ApiResponse;
import com.otpservices.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse<String>> sendOtp(
            @Valid @RequestBody SendOtpRequest request) {

        String message = userService.sendOtp(request);

        ApiResponse<String> response =
                new ApiResponse<>(true, message, null);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<String>> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request) {

        String message = userService.verifyOtp(request);

        ApiResponse<String> response =
                new ApiResponse<>(true, message, null);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        String message = userService.resetPassword(request);

        ApiResponse<String> response =
                new ApiResponse<>(true, message, null);

        return ResponseEntity.ok(response);
    }
}