package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

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

    @Column(name = "play_amount", precision = 10, scale = 2)
    private BigDecimal playAmount;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @Column(name = "drawn_sequence", nullable = false)
    private String drawnSequence;

    @Column(name = "won_percentage")
    private int wonPercentage;

    @Column(name = "won_amount", precision = 10, scale = 2)
    private BigDecimal wonAmount;

    @Column(name = "lost_amount", precision = 10, scale = 2)
    private BigDecimal lostAmount;
}
