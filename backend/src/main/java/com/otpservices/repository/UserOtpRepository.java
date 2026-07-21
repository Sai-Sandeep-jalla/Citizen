package com.otpservices.repository;

import com.otpservices.entity.UserOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserOtpRepository extends JpaRepository<UserOtp, Long> {

    Optional<UserOtp> findTopByPhoneNumberOrderByIdDesc(String phoneNumber);

}