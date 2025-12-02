package com.example.backend.services;

import com.example.backend.entity.Ticket;
import com.example.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServices {

    private final TicketRepository ticketRepository;

    public TicketServices(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

}
