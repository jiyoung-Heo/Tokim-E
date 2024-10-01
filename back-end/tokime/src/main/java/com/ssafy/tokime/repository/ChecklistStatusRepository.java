package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.ChecklistStatus;
import com.ssafy.tokime.model.InvestmentPlannedLand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChecklistStatusRepository extends JpaRepository<ChecklistStatus,Long> {
    List<ChecklistStatus> findByInvestmentPlannedLand(InvestmentPlannedLand investmentPlannedLand);

    void deleteByInvestmentPlannedLand(InvestmentPlannedLand investmentPlannedLand);

}
