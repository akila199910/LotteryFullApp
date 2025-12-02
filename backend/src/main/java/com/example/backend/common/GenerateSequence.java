package com.example.backend.common;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class GenerateSequence {
    public String generateSequence() {

        List<Integer> digits = new ArrayList<>();
        Random random = new Random();

        while (digits.size() < 4) {
            int digit = random.nextInt(10);
            if (!digits.contains(digit)) {
                digits.add(digit);
            }
        }

        char letter = (char) ('A' + random.nextInt(26));

        StringBuilder sequence = new StringBuilder();

        for (int d : digits) {
            sequence.append(d);
        }
        sequence.append(letter);

        return sequence.toString();
    }
}
