package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.InvestmentPlannedLand;
import com.ssafy.tokime.model.InvestmentPlannedLandChecklist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvestmentPlannedLandChecklistDTO {

    private Integer checkListId;
    private Long investmentPlannedLandId;
    private Integer status;
    private String content;

    public InvestmentPlannedLandChecklist toEntity(InvestmentPlannedLand investmentPlannedLand) {
        return InvestmentPlannedLandChecklist.builder()
                .investmentPlannedLand(investmentPlannedLand)
                .checkListId(checkListId)
                .status(status)
                .content(content)
                .build();
    }
}
