package com.example.backend.controller;

import com.example.backend.dto.ProfileUpdateResDTO;
import com.example.backend.dto.UpdateProfileReqDTO;
import com.example.backend.services.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PutMapping("/update-profile")
    public ResponseEntity<ProfileUpdateResDTO> updateProfile(@Valid @RequestBody UpdateProfileReqDTO updateProfileReqDTO){

        ProfileUpdateResDTO res =  profileService.updateProfile(updateProfileReqDTO);

        return ResponseEntity.ok(res);

    }

}
