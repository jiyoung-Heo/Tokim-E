package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.InvestmentPlannedLand;
import com.ssafy.tokime.model.User;
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
    private Long plannedLandPrice;
    private Integer checkedCount;
    private List<Integer> checklistIds; ;
    private String landNickname;
    private Integer landDanger;

    public InvestmentPlannedLand toEntity(User user) {
        return InvestmentPlannedLand.builder()
                .investmentPlannedLandId(investmentPlannedLandId)
                .user(user) // User를 인자로 받아서 설정
                .landAddress(landAddress)
                .landGradient(landGradient)
                .landPrice(landPrice)
                .landRoad(landRoad)
                .landOwner(landOwner)
                .landUseStatus(landUseStatus)
                .landCreatedAt(new Date()) // 현재 시간으로 설정
                .landUpdatedAt(new Date()) // 현재 시간으로 설정
                .landStory(landStory)
                .plannedLandPyeong(plannedLandPyeong)
                .plannedLandPrice(plannedLandPrice)
                .checkedCount(checkedCount)
                .landNickname(landNickname)
                .landDanger(landDanger)
                .build();
    }

}
