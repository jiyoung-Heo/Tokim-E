package com.ssafy.tokime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

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

    @OneToMany(mappedBy = "investmentPlannedLand", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<InvestmentPlannedLandChecklist> checklists;

}
