package com.example.globalipplatform.project.service;

import com.example.globalipplatform.project.DTO.UserRequest;
import com.example.globalipplatform.project.DTO.UserResponse;
import com.example.globalipplatform.project.entity.User;
import com.example.globalipplatform.project.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public RegistrationService(UserRepository userRepository,
                               PasswordEncoder passwordEncoder, User users, UserResponse userResponse) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse register(UserRequest request) {

        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("email is already exits");
        }

        User registerUser=new User();

        registerUser.setUsername(request.getUsername());
        registerUser.setEmail(request.getEmail());
        registerUser.setPassword(passwordEncoder.encode(request.getPassword()));
       registerUser.setRole(request.getRole());

     User savedUser=userRepository.save(registerUser);

     return new UserResponse(
             savedUser.getId(),
             savedUser.getUsername(),
             savedUser.getEmail()
     );
    }
}
