package com.example.globalipplatform.project.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "ip_assets")
public class IpAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String type;

    private String asset_number;

    private String title;

    private String assignee;

    private String inventor;

    private String jurisdiction;

    private LocalDateTime filing_date = LocalDateTime.now();

    private String status;

    @Column(name = "class")
    private String assetClass;


    private String details;

    private String api_source;

    private LocalDateTime last_updated = LocalDateTime.now();

    @OneToMany(mappedBy = "ipAsset", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Subscription> subscription;

    @OneToMany(mappedBy = "ipAsset",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Notification> notifications;

    @OneToMany(mappedBy = "ipAsset",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Filings> filings;

}
