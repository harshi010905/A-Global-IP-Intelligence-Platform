package com.example.globalipplatform.project.controller;

import com.example.globalipplatform.project.DTO.LoginRequest;
import com.example.globalipplatform.project.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService){
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){

        return ResponseEntity.ok(loginService.login(loginRequest));
    }
}
