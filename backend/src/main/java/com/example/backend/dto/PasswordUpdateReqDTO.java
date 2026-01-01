package com.example.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordUpdateReqDTO {

    @NotNull(message = "Current password is required.")
    @NotEmpty(message = "Current password is required.")
    private String currentPassword;

    @NotNull(message = "New password is required.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$",
            message = "New Password must be at least 8 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character.")
    private String password;

    @NotNull(message = "Confirm password is required.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$",
            message = "Confirm Password must be at least 8 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character.")
    private String confirmPassword;
}
