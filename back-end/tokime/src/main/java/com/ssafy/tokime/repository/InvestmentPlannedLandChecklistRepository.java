package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestmentPlannedLandChecklistRepository extends JpaRepository<Checklist, Long> {
}
