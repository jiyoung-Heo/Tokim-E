package com.ssafy.tokime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class InvestmentPlannedLandChecklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer checkListId;

    @ManyToOne
    @JoinColumn(name = "investment_planned_land_id", nullable = false)
    private InvestmentPlannedLand investmentPlannedLand;

    @Column(nullable = false)
    private Integer status=0;

    @Column(nullable = false)
    private String content;


}
