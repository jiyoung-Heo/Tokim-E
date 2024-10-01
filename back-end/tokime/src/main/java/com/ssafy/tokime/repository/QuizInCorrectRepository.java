package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.QuizIncorrect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizInCorrectRepository extends JpaRepository<QuizIncorrect, Long> {
    // 해당 퀴즈의 오답을 모두 가져오기
    @Query("SELECT q FROM QuizIncorrect q WHERE q.quiz.quizId = :quizId")
    List<QuizIncorrect> findAllByQuizId(@Param("quizId") Long quizId);

    // 특정 오답 가져오기
    Optional<QuizIncorrect> findByQuizIncorrectId(Long quizInCorrectId);
}
