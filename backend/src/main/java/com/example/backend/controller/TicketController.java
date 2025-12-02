package com.example.backend.controller;

import com.example.backend.entity.Ticket;
import com.example.backend.services.TicketServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketServices ticketServices;

    public TicketController(TicketServices ticketServices) {
        this.ticketServices = ticketServices;
    }

    @GetMapping
    public ResponseEntity<?> getAllCreatedTickets() {

        List<Ticket> tickets = ticketServices.getAllTickets();

        if (tickets.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "success", false,
                            "message", "No tickets found",
                            "data", tickets
                    ));
        }

        return ResponseEntity
                .ok(Map.of(
                        "success", true,
                        "message", "Tickets fetched successfully",
                        "data", tickets
                ));
    }

}
