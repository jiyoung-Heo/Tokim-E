package com.ssafy.tokime.dto;

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
}
