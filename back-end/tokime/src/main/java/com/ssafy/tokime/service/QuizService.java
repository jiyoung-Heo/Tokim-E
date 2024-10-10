package com.ssafy.tokime.service;

import com.ssafy.tokime.model.Quiz;
import com.ssafy.tokime.model.QuizCorrect;
import com.ssafy.tokime.model.QuizIncorrect;
import com.ssafy.tokime.model.QuizTotal;
import com.ssafy.tokime.repository.QuizCorrectRepository;
import com.ssafy.tokime.repository.QuizInCorrectRepository;
import com.ssafy.tokime.repository.QuizRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private QuizCorrectRepository quizCorrectRepository;
    @Autowired
    private QuizInCorrectRepository quizInCorrectRepository;

    // 특정 퀴즈의 제목 가져오기
    public Optional<Quiz> getQuiz(long quizId) {
        return quizRepository.findById(quizId);
    }

    // 특정 퀴즈의 정답 가져오기
    public Optional<QuizCorrect> getQuizCorrect(long quizId) {
        return quizCorrectRepository.findById(quizId);
    }

    // 특정 퀴즈의 오답들 가져오기
    public List<QuizIncorrect> getQuizIncorrects(long quizId) {
        return quizInCorrectRepository.findAllByQuizId(quizId);
    }

    // 특정 오답 가져오기
    public Optional<QuizIncorrect> getQuizIncorrect(long quizInCorrectId) {
        return quizInCorrectRepository.findById(quizInCorrectId);
    }

    //퀴즈 무작위 5개 가져오기
    public List<Object[]> getQuizList() {
        return quizRepository.findRandomQuizzes();
    }
}
