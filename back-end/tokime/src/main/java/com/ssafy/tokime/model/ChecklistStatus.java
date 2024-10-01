package com.ssafy.tokime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChecklistStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checklistStatusId; // 변경된 필드 이름

    @ManyToOne
    @JoinColumn(name = "investment_planned_land_id", nullable = false)
    private InvestmentPlannedLand investmentPlannedLand;

    @ManyToOne
    @JoinColumn(name = "checklist_id", nullable = false)
    private Checklist checklist;
}
