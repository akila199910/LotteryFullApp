package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PlayRequestDTO {

    @NotBlank(message = "Name is required.")
    private String name;

    @NotBlank(message = "Contact number is required.")
    @Pattern(
            regexp = "^07\\d{8}$",
            message = "Contact number must start with 07 and be exactly 10 digits."
    )
    private String contactNumber;

    @NotNull(message = "Ticket ID is required.")
    private Integer ticketId;
}
