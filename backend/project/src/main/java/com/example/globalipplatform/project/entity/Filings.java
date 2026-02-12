package com.example.globalipplatform.project.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="filings")
public class Filings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ip_asset_id",nullable = false)
    @JsonIgnore
    private IpAsset ipAsset;

   private LocalDateTime date=LocalDateTime.now();

    private String status;
    private String description;
}
