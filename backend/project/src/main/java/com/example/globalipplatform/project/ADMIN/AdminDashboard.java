package com.example.globalipplatform.project.ADMIN;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Admin")
public class AdminDashboard {


    @GetMapping("/Dashboard")
    public String Testing(){

        return "Hey this is Admin Dashboard";
    }
}
