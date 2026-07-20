package com.citizenportal.service;

import com.citizenportal.dto.SendOtpRequest;
import com.citizenportal.dto.VerifyOtpRequest;
import com.citizenportal.entity.UserOtp;
import com.citizenportal.repository.UserOtpRepository;
import com.citizenportal.repository.UserRepository;
import com.citizenportal.util.OtpGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.citizenportal.entity.User;
import com.citizenportal.repository.UserRepository;
import com.citizenportal.dto.ResetPasswordRequest;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserOtpRepository userOtpRepository;
    @Autowired
    private SmsService smsService;
  
    @Autowired
    private UserRepository userRepository; 

   public String sendOtp(SendOtpRequest request) {

      System.out.println("Inside sendOtp()");
    String otp = OtpGenerator.generateOtp();

    UserOtp userOtp = new UserOtp();

    userOtp.setPhoneNumber(request.getPhoneNumber());
    userOtp.setOtp(otp);
    userOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
    userOtp.setVerified(false);

    userOtpRepository.save(userOtp);

     smsService.sendSms(request.getPhoneNumber(), otp);
    return "otp sent successfully";
   
}   

public String verifyOtp(VerifyOtpRequest request) {

    Optional<UserOtp> optionalUserOtp =
            userOtpRepository.findTopByPhoneNumberOrderByIdDesc(request.getPhoneNumber());

    if (optionalUserOtp.isEmpty()) {
        return "Phone Number Not Found";
    }

    UserOtp userOtp = optionalUserOtp.get();
    if (userOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
    return "OTP Expired";
}
if (!userOtp.getOtp().equals(request.getOtp())) {
    return "Invalid OTP";
}

     userOtp.setVerified(true);
    userOtpRepository.save(userOtp);

    return "OTP Verified Successfully";
}
   public String resetPassword(ResetPasswordRequest request) {

    Optional<UserOtp> optionalUserOtp =
            userOtpRepository.findTopByPhoneNumberOrderByIdDesc(request.getPhoneNumber());

    if (optionalUserOtp.isEmpty()) {
        return "Phone Number Not Found";
    }

    UserOtp userOtp = optionalUserOtp.get();

    if (!userOtp.isVerified()) {
        return "Please verify OTP first";
    }

    Optional<User> optionalUser =
            userRepository.findByPhoneNumber(request.getPhoneNumber());

    if (optionalUser.isEmpty()) {
        return "User Not Found";
    }

    User user = optionalUser.get();

    user.setPassword(request.getNewPassword());

    userRepository.save(user);

    userOtp.setVerified(false);
    userOtpRepository.save(userOtp);

    return "Password Reset Successfully";
}

}