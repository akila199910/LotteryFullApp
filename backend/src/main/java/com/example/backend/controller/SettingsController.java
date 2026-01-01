package com.example.backend.controller;

import com.example.backend.dto.PasswordUpdateReqDTO;
import com.example.backend.dto.PasswordUpdateResDTO;
import com.example.backend.services.SettingsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SettingsController {

    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @PutMapping("/update-password")
    public ResponseEntity<PasswordUpdateResDTO> updatePassword(@Valid @RequestBody PasswordUpdateReqDTO passwordUpdateReqDTO){
        PasswordUpdateResDTO res = settingsService.updatePassword(passwordUpdateReqDTO);
        return ResponseEntity.ok(res);
    }
}
