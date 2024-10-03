package com.ssafy.tokime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class QuizTotal {
    @Column(name="quiz_question")
    private Long quizId;
    @Column(name = "quiz_question",nullable = false)
    private String quizQuestion;
    @Column(name="correct_answer")
    private String correctAnswer;
    @Column(name="incorrect_answer")
    private String incorrectAnswer;
}
