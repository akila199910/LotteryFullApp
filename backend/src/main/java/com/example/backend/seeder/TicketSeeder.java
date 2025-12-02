package com.example.backend.seeder;

import com.example.backend.common.GenerateSequence;
import com.example.backend.entity.Ticket;
import com.example.backend.repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class TicketSeeder implements CommandLineRunner {

    private final TicketRepository ticketRepository;
    private final GenerateSequence generateSequence;

    public TicketSeeder(TicketRepository ticketRepository, GenerateSequence generateSequence) {
        this.ticketRepository = ticketRepository;
        this.generateSequence = generateSequence;
    }


    @Override
    public void run(String... args) throws Exception {

        if (ticketRepository.count()>0){
            System.out.println("Tickets already exist, skipping seeding...");
            return;
        }

        Set<String> sequences = new HashSet<>();

        while (sequences.size() < 10) {
            String sequence = generateSequence.generateSequence();
            sequences.add(sequence);
        }

        for (String seq : sequences) {
            Ticket ticket = new Ticket();
            ticket.setSequence(seq);
            ticketRepository.save(ticket);
        }

        System.out.println("Seeded " + sequences.size() + " lottery ticket sequences.");

    }
}
