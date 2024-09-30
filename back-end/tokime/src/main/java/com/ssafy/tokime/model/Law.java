package com.ssafy.tokime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Law {
    public Law(Long lawId){this.lawId = lawId;}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lawId;

    @Column(nullable = false)
    private String lawName;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String lawContent;

    @Column(nullable = false)
    private String lawItemNumber;

    @Column(nullable = false)
    private String lawLandUse;

    @Column(nullable = false)
    private Long lawDistrict;

    @Column(nullable = false)
    private Date lawImplementAt;
}
