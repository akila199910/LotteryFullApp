package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "contact_number", nullable = false, length = 10, unique = true)
    private String contactNumber;

    @Column(name = "name", nullable = false)
    private String name;
}
