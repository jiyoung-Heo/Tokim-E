package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Landknowledge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LandknowledgeRepository extends JpaRepository<Landknowledge, Long> {

    // 단어만 다 가져옴
    @Query(value="select knowledgeWord from Landknowledge")
    List<String> getWordList();

    // 특정 단어의 value값 가져옴
    Optional<Landknowledge> findById(Long knowledgeId);
}
