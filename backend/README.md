# 🎟️ Lottery App Backend (Spring Boot)

This project is a minimalistic lottery backend application built using **Spring Boot**, **Spring Data JPA**, and **MySQL**.  
It allows users to select a lottery ticket, generate a random lottery draw, calculate winnings, and store results.
---

## 🚀 Features

- Preloaded 10 unique lottery tickets (4 digits + 1 letter).
- Guest can play using name, contact number, and ticket ID.
- Generates dynamic draw sequence.
- Calculates winnings based on:
  - ✔ 20% — Correct digit in correct position  
  - ✔ 10% — Correct digit in wrong position  
  - ✔ 10% — Correct letter  
  - ✔ 100% — Perfect match  
- Saves each play attempt to DB.
- Includes full global exception handling (400, 404, 500).
- Input validation (contact number format, name, ticket ID).
---

## 🏗️ Technology Stack

- Java 17
- Spring Boot 3+
- Spring Data JPA
- Hibernate
- MySQL
- Lombok
- Maven
---

## 📂 Project Structure

rc/main/java/com.example.lotteryApp
│

├── common/ # Sequence generator utility

├── controller/ # REST controllers

├── dto/ # Request & response DTOs

├── entity/ # JPA entities

├── exception/ # Custom exceptions & global handler

├── repository/ # JPA repositories

├── seeder/ # Startup ticket seeder

└── services/ # Business services

---

## ▶️ Running the Application

### 1. Clone Repo

git clone https://github.com/akila199910/lotteryApp

cd lotteryApp

mvn clean install
