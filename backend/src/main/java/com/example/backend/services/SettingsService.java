package com.example.backend.services;

import com.example.backend.dto.PasswordUpdateReqDTO;
import com.example.backend.dto.PasswordUpdateResDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SettingsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public SettingsService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public PasswordUpdateResDTO updatePassword(PasswordUpdateReqDTO passwordUpdateReqDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()
                || auth.getPrincipal().equals("anonymousUser")) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "User not  authenticated"
            );
        }

        if (!passwordUpdateReqDTO.getConfirmPassword().equals(passwordUpdateReqDTO.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "New Password and Confirm Password should be same."
            );
        }
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found."));

        if (!passwordEncoder.matches(passwordUpdateReqDTO.getCurrentPassword(), user.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Current password is incorrect"
            );
        }

        if (passwordEncoder.matches(passwordUpdateReqDTO.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "New password cannot be same as old password"
            );
        }


        user.setPassword(passwordEncoder.encode(passwordUpdateReqDTO.getPassword()));
        userRepository.save(user);

        return new PasswordUpdateResDTO("Password update successfully.");
    }
}
