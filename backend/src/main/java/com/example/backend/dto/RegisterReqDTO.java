package com.example.backend.dto;

import com.example.backend.Anotation.PasswordMatch;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@PasswordMatch(message = "Password and Confirm Password do not match")
public class RegisterReqDTO {

    @NotBlank(message = "Name is required.")
    private String name;

    @NotBlank(message = "Contact number is required.")
    @Pattern(
            regexp = "^07\\d{8}$",
            message = "Contact number must start with 07 and be exactly 10 digits."
    )
    private String contactNumber;

    @NotBlank(message = "Email is required.")
    @Email(message = "Email should be valid email.")
    private String email;

    @NotBlank(message = "Password is required.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$",
            message = "Password must be at least 8 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character.")
    private String password;

    @NotBlank(message = "Confirm Password is required.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$",
            message = "Confirm Password must be at least 8 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character.")
    private String confirmPassword;


}
