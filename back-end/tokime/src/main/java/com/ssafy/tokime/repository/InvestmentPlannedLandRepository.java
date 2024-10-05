package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.InvestmentPlannedLand;
import com.ssafy.tokime.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface InvestmentPlannedLandRepository extends JpaRepository<InvestmentPlannedLand, Long>
, QuerydslPredicateExecutor<InvestmentPlannedLand> {
    List<InvestmentPlannedLand> findByUser(User user);
}
