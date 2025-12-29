package com.example.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUpdateResDTO {

    private String name;
    private String contactNumber;
    private String email;
    private String profileUrl;

}
