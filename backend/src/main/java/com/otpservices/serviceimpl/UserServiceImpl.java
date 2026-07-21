package com.otpservices.serviceimpl;

import com.otpservices.constants.MessageConstants;
import com.otpservices.dto.request.ResetPasswordRequest;
import com.otpservices.dto.request.SendOtpRequest;
import com.otpservices.dto.request.VerifyOtpRequest;
import com.otpservices.entity.User;
import com.otpservices.entity.UserOtp;
import com.otpservices.exception.InvalidOtpException;
import com.otpservices.exception.ResourceNotFoundException;
import com.otpservices.repository.UserOtpRepository;
import com.otpservices.repository.UserRepository;
import com.otpservices.service.SmsService;
import com.otpservices.service.UserService;
import com.otpservices.utils.OtpGenerator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserOtpRepository userOtpRepository;
    private final SmsService smsService;
    private final UserRepository userRepository;

    public UserServiceImpl(UserOtpRepository userOtpRepository,
                           SmsService smsService,
                           UserRepository userRepository) {
        this.userOtpRepository = userOtpRepository;
        this.smsService = smsService;
        this.userRepository = userRepository;
    }

    @Override
    public String sendOtp(SendOtpRequest request) {

        String otp = OtpGenerator.generateOtp();

        UserOtp userOtp = new UserOtp();
        userOtp.setPhoneNumber(request.getPhoneNumber());
        userOtp.setOtp(otp);
        userOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        userOtp.setVerified(false);

        userOtpRepository.save(userOtp);

        smsService.sendSms(request.getPhoneNumber(), otp);

        return MessageConstants.OTP_SENT;
    }

    @Override
    public String verifyOtp(VerifyOtpRequest request) {

        Optional<UserOtp> optionalUserOtp =
                userOtpRepository.findTopByPhoneNumberOrderByIdDesc(
                        request.getPhoneNumber());

        if (optionalUserOtp.isEmpty()) {
            throw new ResourceNotFoundException(
                    MessageConstants.PHONE_NUMBER_NOT_FOUND);
        }

        UserOtp userOtp = optionalUserOtp.get();

        if (userOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new InvalidOtpException(
                    MessageConstants.OTP_EXPIRED);
        }

        if (!userOtp.getOtp().equals(request.getOtp())) {
            throw new InvalidOtpException(
                    MessageConstants.INVALID_OTP);
        }

        userOtp.setVerified(true);
        userOtpRepository.save(userOtp);

        return MessageConstants.OTP_VERIFIED;
    }

    @Override
    public String resetPassword(ResetPasswordRequest request) {

        Optional<UserOtp> optionalUserOtp =
                userOtpRepository.findTopByPhoneNumberOrderByIdDesc(
                        request.getPhoneNumber());

        if (optionalUserOtp.isEmpty()) {
            throw new ResourceNotFoundException(
                    MessageConstants.PHONE_NUMBER_NOT_FOUND);
        }

        UserOtp userOtp = optionalUserOtp.get();

        if (!userOtp.isVerified()) {
            throw new InvalidOtpException(
                    MessageConstants.VERIFY_OTP_FIRST);
        }

        Optional<User> optionalUser =
                userRepository.findByPhoneNumber(
                        request.getPhoneNumber());

        if (optionalUser.isEmpty()) {
            throw new ResourceNotFoundException(
                    MessageConstants.USER_NOT_FOUND);
        }

        User user = optionalUser.get();
        user.setPassword(request.getNewPassword());

        userRepository.save(user);

        userOtp.setVerified(false);
        userOtpRepository.save(userOtp);

        return MessageConstants.PASSWORD_RESET;
    }
}