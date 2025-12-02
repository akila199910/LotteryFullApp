package com.example.backend.controller;

import com.example.backend.dto.PlayRequestDTO;
import com.example.backend.services.PlayService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/play")
public class PlayController {

    private final PlayService playService;

    public PlayController(PlayService playService) {

        this.playService = playService;
    }

    @PostMapping
    public ResponseEntity<?>playTicket(@Valid @RequestBody PlayRequestDTO request){

        System.out.println("Test");

        Map<String, Object> body = new HashMap<>();
        body.put("status", true);
        body.put("message", "Ticket played successfully");
        body.put("data", playService.tryTicket(request));
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }
}
