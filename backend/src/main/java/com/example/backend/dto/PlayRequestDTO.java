package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PlayRequestDTO {

    @NotNull(message = "Ticket ID is required.")
    private Integer ticketId;

    @Pattern(
            regexp = "^[0-9]+(\\.[0-9]+)?$",
            message = "Amount must be a valid number (integer or decimal)."
    )
    @NotNull(message = "Amount is required.")
    private String amount;

}
