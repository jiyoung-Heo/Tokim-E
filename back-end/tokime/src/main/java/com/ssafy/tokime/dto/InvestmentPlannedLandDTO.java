package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.InvestmentPlannedLand;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvestmentPlannedLandDTO {
    private Long investmentPlannedLandId;
    private Long userId;
    private String landAddress;
    private String landGradient;
    private Integer landPrice;
    private String landRoad;
    private String landOwner;
    private String landUseStatus;
    private Date landCreatedAt;
    private Date landUpdatedAt;
    private String landStory;
    private Integer plannedLandPyeong;
    private Integer plannedLandPrice;
    private Integer checkedCount;
    private List<InvestmentPlannedLandChecklistDTO> checklists;

    public InvestmentPlannedLand toEntity() {
        return InvestmentPlannedLand.builder()
                .investmentPlannedLandId(investmentPlannedLandId)
                .landAddress(landAddress)
                .landGradient(landGradient)
                .landPrice(landPrice)
                .landRoad(landRoad)
                .landOwner(landOwner)
                .landUseStatus(landUseStatus)
                .landCreatedAt(landCreatedAt)
                .landUpdatedAt(landUpdatedAt)
                .landStory(landStory)
                .plannedLandPyeong(plannedLandPyeong)
                .plannedLandPrice(plannedLandPrice)
                .checkedCount(checkedCount)
                .build();
    }
}
