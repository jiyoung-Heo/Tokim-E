package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Landknowledge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LandknowledgeRepository extends JpaRepository<Landknowledge, Long> {

    // 전체 다 가져오는 거(필요한가?)
    // 카테고리별로 가져오는 거.
    List<Landknowledge> findAllByKnowledgeCategory(Long knowledgeCategory);
}
