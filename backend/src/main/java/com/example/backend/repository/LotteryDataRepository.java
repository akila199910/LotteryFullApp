package com.example.backend.repository;

import com.example.backend.entity.LotteryData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LotteryDataRepository extends JpaRepository<LotteryData,Integer> {
}
