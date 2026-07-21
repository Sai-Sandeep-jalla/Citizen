package com.otpservices.service;

import com.otpservices.dto.request.ResetPasswordRequest;
import com.otpservices.dto.request.SendOtpRequest;
import com.otpservices.dto.request.VerifyOtpRequest;

public interface UserService {

    String sendOtp(SendOtpRequest request);

    String verifyOtp(VerifyOtpRequest request);

    String resetPassword(ResetPasswordRequest request);
}