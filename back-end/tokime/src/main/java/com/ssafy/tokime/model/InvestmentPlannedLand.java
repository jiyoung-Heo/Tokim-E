package com.ssafy.tokime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvestmentPlannedLand {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long investmentPlannedLandId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private String landAddress;

    @Column
    private String landGradient;

    @Column
    private Long landPrice;

    @Column
    private String landRoad;

    @Column
    private String landOwner;

    @Column
    private String landUseStatus;

    @Column(nullable = false)
    private Date landCreatedAt;

    @Column(nullable = false)
    private Date landUpdatedAt;

    @Column(columnDefinition = "TEXT")
    private String landStory;

    @Column
    private Integer plannedLandPyeong;

    @Column
    private Integer plannedLandPrice;

    @Column(nullable = false)
    private Integer checkedCount=0;

}
