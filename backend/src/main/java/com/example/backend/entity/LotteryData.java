package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "lottery_data")
@Data
public class LotteryData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @Column(name = "drawn_sequence", nullable = false)
    private String drawnSequence;

    @Column(name = "won_percentage", nullable = false)
    private int wonPercentage;

    @Column(name = "won_amount", nullable = true)
    private Double wonAmount;
}
