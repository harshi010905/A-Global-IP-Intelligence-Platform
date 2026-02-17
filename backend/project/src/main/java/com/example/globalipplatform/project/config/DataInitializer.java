package com.example.globalipplatform.project.config;

import com.example.globalipplatform.project.DTO.Role;
import com.example.globalipplatform.project.entity.User;
import com.example.globalipplatform.project.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Create test admin user if not exists
            if (!userRepository.existsByEmail("admin@test.com")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@test.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
                System.out.println("Admin user created - email: admin@test.com, password: admin123");
            }

            // Create test regular user if not exists
            if (!userRepository.existsByEmail("user@test.com")) {
                User user = new User();
                user.setUsername("user");
                user.setEmail("user@test.com");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRole(Role.USER);
                userRepository.save(user);
                System.out.println("Regular user created - email: user@test.com, password: user123");
            }
        };
    }
}