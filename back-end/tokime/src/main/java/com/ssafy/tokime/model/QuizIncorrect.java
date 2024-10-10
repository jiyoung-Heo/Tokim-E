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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
//    @Column(name = "quiz_Id")
    private Quiz quiz;

    @Column(nullable = false)
    private String incorrectAnswer;
}
