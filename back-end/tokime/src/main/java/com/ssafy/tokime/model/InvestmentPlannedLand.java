package com.ssafy.tokime.model;

import com.ssafy.tokime.dto.InvestmentPlannedLandDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.List;

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

    @Column(length = 50)
    private String landAddress;

    @Column(length = 50)
    private String landGradient;

    @Column
    private Integer landPrice;

    @Column(length = 50)
    private String landRoad;

    @Column(length = 50)
    private String landOwner;

    @Column(length = 50)
    private String landUseStatus;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date landCreatedAt;

    @LastModifiedDate
    @Column(nullable = false)
    private Date landUpdatedAt;

    @Column(columnDefinition = "TEXT")
    private String landStory;
    @Column
    private Integer plannedLandPyeong;

    @Column
    private Integer plannedLandPrice;

    @Builder .Default
    @Column(nullable = false)
    private Integer checkedCount=0;


    public InvestmentPlannedLandDTO toDTO() {
        return InvestmentPlannedLandDTO.builder()
                .investmentPlannedLandId(this.investmentPlannedLandId)
                .userId(this.user.getUserId()) // User ID 추가
                .landAddress(this.landAddress)
                .landGradient(this.landGradient)
                .landPrice(this.landPrice)
                .landRoad(this.landRoad)
                .landOwner(this.landOwner)
                .landUseStatus(this.landUseStatus)
                .landCreatedAt(this.landCreatedAt)
                .landUpdatedAt(this.landUpdatedAt)
                .landStory(this.landStory)
                .plannedLandPyeong(this.plannedLandPyeong)
                .plannedLandPrice(this.plannedLandPrice)
                .checkedCount(this.checkedCount)
                .build();
    }

}
