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
@Entity
public class QuizIncorrect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizIncorrectId;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quizId;

    @Column(nullable = false)
    private String incorrectAnswer;
}
