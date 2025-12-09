package com.example.backend.services;

import com.example.backend.dto.RegisterReqDTO;
import com.example.backend.dto.RegisterResDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public RegisterResDTO registerService(RegisterReqDTO registerReqDTO){

        if(userRepository.existsByContactNumber(registerReqDTO.getContactNumber())){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Contact Number already taken.");
        }

        if(userRepository.existsByEmail(registerReqDTO.getEmail())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already taken.");
        }

        User newUser = new User();
        newUser.setName(registerReqDTO.getName());
        newUser.setEmail(registerReqDTO.getEmail());
        newUser.setContactNumber(registerReqDTO.getContactNumber());
        newUser.setPassword(passwordEncoder.encode(registerReqDTO.getPassword()));

        userRepository.save(newUser);

        return new RegisterResDTO(true,"User Register Successfully.");
    }


}
