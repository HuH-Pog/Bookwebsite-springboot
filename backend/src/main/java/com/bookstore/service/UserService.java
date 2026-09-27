package com.bookstore.service;

import com.bookstore.dto.LoginRequest;
import com.bookstore.dto.RegisterRequest;
import com.bookstore.dto.UserResponse;
import com.bookstore.entity.User;
import com.bookstore.exception.InvalidCredentialsException;
import com.bookstore.exception.PasswordMismatchException;
import com.bookstore.exception.ResourceNotFoundException;
import com.bookstore.exception.UserAlreadyExistsException;
import com.bookstore.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse register(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new PasswordMismatchException("Password and confirm password do not match");
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new UserAlreadyExistsException("An account with this email already exists");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setPhone(request.getPhone().trim());
        user.setAddress(request.getAddress().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User saved = userRepository.save(user);
        return UserResponse.fromEntity(saved);
    }

    public UserResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return UserResponse.fromEntity(user);
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserResponse.fromEntity(user);
    }
}
