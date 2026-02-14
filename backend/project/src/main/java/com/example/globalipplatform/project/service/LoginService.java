package com.example.globalipplatform.project.service;


import com.example.globalipplatform.project.DTO.LoginCode;
import com.example.globalipplatform.project.config.JWTService;
import com.example.globalipplatform.project.config.UserPrincipal;
import com.example.globalipplatform.project.entity.User;
import com.example.globalipplatform.project.repository.UserRepository;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final EmailService mailService;
    private final JWTService jwtService;

    //it is used for thread safe and store the randomcodes
    private final Map<String, LoginCode> loginCodes = new ConcurrentHashMap<>();

    //it is used for generate the codes randomly
    private final SecureRandom secureRandom = new SecureRandom();

    public LoginService(UserRepository userRepository,
                        EmailService mailService,
                        JWTService jwtService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }

    public void sendLoginCode(String email) throws MessagingException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        //it is checking for email was already sent or not
        if (loginCodes.containsKey(email)) {
            LoginCode existing = loginCodes.get(email);
            if (existing.getExpiry().isAfter(LocalDateTime.now())) {
                throw new RuntimeException("OTP already sent. Please wait.");
            }
        }
      //generating the login code
        String code = String.format("%06d", secureRandom.nextInt(1_000_000));

        LoginCode loginCode = new LoginCode(
                code,
                LocalDateTime.now().plusMinutes(5)
        );

        loginCodes.put(email, loginCode);

        String body = "Hello " + user.getUsername() + ",\n\n" +
                "Your login code is: " + code + "\n" +
                "This code will expire in 5 minutes.\n\n" +
                "Thank you!";

        mailService.sendEmail(email, "Your Login Code", body);
    }

    public String verifyLoginCode(String email, String code) {

        LoginCode loginCode = loginCodes.get(email);

        if (loginCode == null) {
            throw new RuntimeException("No OTP found. Please request again.");
        }

        if (loginCode.getExpiry().isBefore(LocalDateTime.now())) {
            loginCodes.remove(email);
            throw new RuntimeException("OTP expired.");
        }

        if (!loginCode.getCode().equals(code)) {
            throw new RuntimeException("Invalid OTP.");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        loginCodes.remove(email);

        return jwtService.generateToken(new UserPrincipal(user));
    }

}
