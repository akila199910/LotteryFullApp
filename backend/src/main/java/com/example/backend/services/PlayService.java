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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;
import java.util.Optional;

@Service
public class PlayService {

    private final GenerateSequence generateSequence;
    private final UserRepository userRepository;
    private final LotteryDataRepository lotteryDataRepository;
    private final TicketRepository ticketRepository;

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

        User user = userRepository.findByEmail(Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String selectedSequence = ticket.getSequence();
        String drawnSequence = generateSequence.generateSequence();

        int winningPercentage = calculateWinningPercentage(selectedSequence, drawnSequence);

        BigDecimal amount = new BigDecimal(playRequestDTO.getAmount());
        BigDecimal percentage = BigDecimal.valueOf(winningPercentage)
                .divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP);

        BigDecimal amountWon = amount.multiply(percentage);


        LotteryData lotteryData = new LotteryData();
        lotteryData.setTicket(ticket);
        lotteryData.setUser(user);
        lotteryData.setDrawnSequence(drawnSequence);
        lotteryData.setWonPercentage(winningPercentage);
        lotteryData.setWonAmount(amountWon);
        lotteryData.setPlayAmount(amount);
        lotteryData.setLostAmount(null);
        lotteryData = lotteryDataRepository.save(lotteryData);

        PlayResponseDTO responseDTO = new PlayResponseDTO();
        responseDTO.setLotteryId(lotteryData.getId());
        responseDTO.setSelectedSequence(selectedSequence);
        responseDTO.setDrawnSequence(drawnSequence);
        responseDTO.setWinningPercentage(winningPercentage);
        responseDTO.setAmountWon(amountWon.doubleValue());
        responseDTO.setPlayAmount(lotteryData.getPlayAmount().doubleValue());

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
