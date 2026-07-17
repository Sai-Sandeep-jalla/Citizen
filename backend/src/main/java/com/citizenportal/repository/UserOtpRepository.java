package com.citizenportal.repository;

import com.citizenportal.entity.UserOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserOtpRepository extends JpaRepository<UserOtp, Long> {

    Optional<UserOtp> findTopByPhoneNumberOrderByIdDesc(String phoneNumber);

}