package com.example.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserReqDTO {

    private String name;
    private String contactNumber;
    private String email;
    private String profileUrl;

}
