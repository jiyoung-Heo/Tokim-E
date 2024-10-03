package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Quiz;
import com.ssafy.tokime.model.QuizTotal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    //퀴즈 무작위 20개
    @Query(value = """
        WITH selected_quizzes AS (
          SELECT quiz_id, quiz_question
          FROM quiz
          ORDER BY RAND()
          LIMIT 20
        )
        SELECT sq.quiz_id, sq.quiz_question, qc.correct_answer, qi.incorrect_answer
        FROM selected_quizzes sq
        LEFT JOIN quiz_correct qc ON sq.quiz_id = qc.quiz_id
        LEFT JOIN quiz_incorrect qi ON sq.quiz_id = qi.quiz_id
        """, nativeQuery = true)
    List<Object[]> findRandomQuizzes();


}
