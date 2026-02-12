package com.example.globalipplatform.project.controller;

import com.example.globalipplatform.project.DTO.UserRequest;
import com.example.globalipplatform.project.DTO.UserResponse;
import com.example.globalipplatform.project.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    private final RegistrationService userService;

    public RegistrationController(RegistrationService userService) {
        this.userService = userService;
    }

    @PostMapping("/registration")
    public ResponseEntity<UserResponse> register(@RequestBody UserRequest user) {


        return ResponseEntity.ok(userService.register(user));
    }
}
