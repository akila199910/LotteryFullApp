package com.example.backend.common;

import com.example.backend.Anotation.PasswordMatch;
import com.example.backend.dto.RegisterReqDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, RegisterReqDTO>{
    @Override
    public boolean isValid(RegisterReqDTO dto, ConstraintValidatorContext context) {
        if (dto.getPassword() == null || dto.getConfirmPassword() == null) {
            return false;
        }
        return dto.getPassword().equals(dto.getConfirmPassword());
    }
}
