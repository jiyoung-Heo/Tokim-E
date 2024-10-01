package com.ssafy.tokime.dto;

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
}
