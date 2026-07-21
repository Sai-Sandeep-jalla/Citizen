package com.otpservices.exception;
import com.otpservices.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleResourceNotFound(
            ResourceNotFoundException ex) {

        ApiResponse<String> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null
        );

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<ApiResponse<String>> handleInvalidOtp(
            InvalidOtpException ex) {

        ApiResponse<String> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null
        );

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleException(
            Exception ex) {

        ApiResponse<String> response = new ApiResponse<>(
                false,
                "Something went wrong",
                null
        );

        return new ResponseEntity<>(response,
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}