package com.example.backend.dto;

import lombok.Data;

@Data
public class PlayResponseDTO {

    private  Integer lotteryId;
    private String selectedSequence;
    private String DrawnSequence;
    private int winningPercentage;
    private Double amountWon;
}
