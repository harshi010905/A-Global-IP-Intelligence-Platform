package com.example.globalipplatform.project.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;

    @Email
    @Column(nullable = false, unique = true)
    private String email;
    private String password;
    private String role;

    private LocalDateTime createdAt = LocalDateTime.now();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Subscriptions> subscriptions;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Notifications> notifications;


}
