package com.example.globalipplatform.project.controller;


import com.example.globalipplatform.project.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

       //  request for otp
    @PostMapping("/request-login")
    public ResponseEntity<String> requestLogin(@RequestParam String email) throws MessagingException {

        loginService.sendLoginCode(email);
        return ResponseEntity.ok("OTP sent to email: " + email);
    }

       //otp-verification for login
    @PostMapping("/verify-login")
    public ResponseEntity<String> verifyLogin(
            @RequestParam String email,
            @RequestParam String code) {

        String jwtToken = loginService.verifyLoginCode(email, code);
        return ResponseEntity.ok(jwtToken);
    }
}
