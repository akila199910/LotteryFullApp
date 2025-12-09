package com.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginReqDTO {

    @NotBlank(message = "Email is required.")
    @Email(message = "Email should be valid email.")
    private String email;

    @NotBlank(message = "Password is required.")
    private String password;
}
