package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.InvestmentPlannedLand;
import com.ssafy.tokime.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface InvestmentPlannedLandRepository extends JpaRepository<InvestmentPlannedLand, Long> {
    List<InvestmentPlannedLand> findByUser(User user);

}
