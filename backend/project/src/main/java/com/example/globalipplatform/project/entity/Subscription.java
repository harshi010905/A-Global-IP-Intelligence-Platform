package com.example.globalipplatform.project.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch =FetchType.LAZY )
    @JoinColumn(name="ip_asset_id",nullable = false)
    @JsonIgnore
    private IpAsset ipAsset;

    private LocalDateTime created_at= LocalDateTime.now();
}
