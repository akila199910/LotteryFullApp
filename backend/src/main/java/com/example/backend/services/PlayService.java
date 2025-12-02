package com.example.backend.services;

import com.example.backend.common.GenerateSequence;
import com.example.backend.dto.PlayRequestDTO;
import com.example.backend.dto.PlayResponseDTO;
import com.example.backend.entity.LotteryData;
import com.example.backend.entity.Ticket;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.LotteryDataRepository;
import com.example.backend.repository.TicketRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlayService {

    private final GenerateSequence generateSequence;
    private final UserRepository userRepository;
    private final LotteryDataRepository lotteryDataRepository;
    private final TicketRepository ticketRepository;

    private static final double JACKPOT = 100000.0;

    public PlayService(GenerateSequence generateSequence, UserRepository userRepository,
                       LotteryDataRepository lotteryDataRepository, TicketRepository ticketRepository) {
        this.generateSequence = generateSequence;
        this.userRepository = userRepository;
        this.lotteryDataRepository = lotteryDataRepository;
        this.ticketRepository = ticketRepository;
    }

    public PlayResponseDTO tryTicket(PlayRequestDTO playRequestDTO) {

        Optional<Ticket> ticketOpt = ticketRepository.findById(playRequestDTO.getTicketId());
        if (ticketOpt.isEmpty()) {
            throw new ResourceNotFoundException("Ticket not found");
        }

        Ticket ticket = ticketOpt.get();

        User user = userRepository.findByContactNumber(playRequestDTO.getContactNumber())
                .orElseGet(() -> registerUser(playRequestDTO.getName(), playRequestDTO.getContactNumber()));

        String selectedSequence = ticket.getSequence();
        String drawnSequence = generateSequence.generateSequence();

        // here need to create function to cal win percentage
        int winningPercentage = calculateWinningPercentage(selectedSequence, drawnSequence);

        double amountWon = (winningPercentage / 100.0) * JACKPOT;

        LotteryData lotteryData = new LotteryData();
        lotteryData.setTicket(ticket);
        lotteryData.setUser(user);
        lotteryData.setDrawnSequence(drawnSequence);
        lotteryData.setWonPercentage(winningPercentage);
        lotteryData.setWonAmount(amountWon);

        lotteryData = lotteryDataRepository.save(lotteryData);

        PlayResponseDTO responseDTO = new PlayResponseDTO();
        responseDTO.setLotteryId(lotteryData.getId());
        responseDTO.setSelectedSequence(selectedSequence);
        responseDTO.setDrawnSequence(drawnSequence);
        responseDTO.setWinningPercentage(winningPercentage);
        responseDTO.setAmountWon(amountWon);

        return responseDTO;
    }

    private User registerUser(String name, String contactNumber) {
        User newUser = new User();
        newUser.setContactNumber(contactNumber);
        newUser.setName(name);
        return userRepository.save(newUser);
    }

    private int calculateWinningPercentage(String ticket, String draw) {

        int percentage = 0;


        char ticketLetter = ticket.charAt(4);
        char drawLetter = draw.charAt(4);

        if (ticketLetter == drawLetter) {
            percentage += 10;
        }

        String ticketDigits = ticket.substring(0, 4);
        String drawDigits = draw.substring(0, 4);

        for (int i = 0; i < 4; i++) {

            char t = ticketDigits.charAt(i);

            if (t == drawDigits.charAt(i)) {
                percentage += 20;
            } else if (drawDigits.contains(String.valueOf(t))) {
                percentage += 10;
            }
        }

        if (ticket.equals(draw)) {
            return 100;
        }

        return Math.min(100, percentage);
    }
}
