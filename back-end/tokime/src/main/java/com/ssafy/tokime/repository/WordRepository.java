package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Landterm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Landterm, Long> {

    // 단어만 다 가져옴
    // 임시로 500개까지만.. 이게 오류인진 모르겠음
    @Query(value="select l from Landterm as l where l.termId <= 500")
    List<Landterm> getWordList();

    // 특정 검색어에 해당하는 단어만 가져옴
    List<Landterm> findBytermNameContaining(String keyword);

    // 특정 단어의 value값 가져옴
    Optional<Landterm> findById(Long wordId);
}
