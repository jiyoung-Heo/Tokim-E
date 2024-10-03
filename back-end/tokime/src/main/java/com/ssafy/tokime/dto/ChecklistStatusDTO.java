package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Checklist;
import com.ssafy.tokime.model.InvestmentPlannedLand;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChecklistStatusDTO {
    private Long checklistStatusId;

    private InvestmentPlannedLand investmentPlannedLand;

    private ResponseDTO checklist;

    @Getter
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDTO{
        private Checklist checklistId;
        private String content;

    }

}
