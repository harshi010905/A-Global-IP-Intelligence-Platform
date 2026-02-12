package com.example.globalipplatform.project.service;

import com.example.globalipplatform.project.DTO.LoginRequest;
import com.example.globalipplatform.project.entity.User;
import com.example.globalipplatform.project.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        return "Login Successful";
    }
}
