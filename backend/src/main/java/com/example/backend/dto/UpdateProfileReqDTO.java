package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateProfileReqDTO {

    @NotBlank(message = "Name is required.")
    private String name;

    @NotBlank(message = "Contact number is required.")
    @Pattern(
            regexp = "^07\\d{8}$",
            message = "Contact number must start with 07 and be exactly 10 digits."
    )
    private String contactNumber;

}
