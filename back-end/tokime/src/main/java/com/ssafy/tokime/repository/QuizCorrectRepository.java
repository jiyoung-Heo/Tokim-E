package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.QuizCorrect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizCorrectRepository extends JpaRepository<QuizCorrect, Long> {
}
