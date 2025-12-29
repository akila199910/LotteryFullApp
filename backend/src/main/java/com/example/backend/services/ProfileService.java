package com.example.backend.services;

import com.example.backend.dto.ProfileUpdateResDTO;
import com.example.backend.dto.UpdateProfileReqDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ProfileUpdateResDTO updateProfile(UpdateProfileReqDTO updateProfileReqDTO) {

        System.out.println(updateProfileReqDTO);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);

        if (auth == null || !auth.isAuthenticated()
                || auth.getPrincipal().equals("anonymousUser")) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "User not  authenticated"
            );
        }

        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found."));

        Integer currentUserId = user.getId();

        if (updateProfileReqDTO.getContactNumber() != null && userRepository.existsByContactNumberAndIdNot(updateProfileReqDTO.getContactNumber(), currentUserId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Contact Number already taken.");
        }

        user.setName(updateProfileReqDTO.getName());
        user.setContactNumber(updateProfileReqDTO.getContactNumber());

        User newUser = userRepository.save(user);

        return new ProfileUpdateResDTO(newUser.getName(), newUser.getEmail(),newUser.getContactNumber(), null);

    }
}
