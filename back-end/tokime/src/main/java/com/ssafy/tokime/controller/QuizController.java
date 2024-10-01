package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.QuizDTO;
import com.ssafy.tokime.model.Quiz;
import com.ssafy.tokime.model.QuizCorrect;
import com.ssafy.tokime.model.QuizIncorrect;
import com.ssafy.tokime.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/quiz")
public class QuizController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private QuizService quizService;

    //문제의 수, 우선 1개로하고 완성되면 20개로!
    static int num = 20;

    // 특정 퀴즈 조회
    @GetMapping("")
    public ResponseEntity<?> getQuiz() {
        // 20개의 문제를 선별
        long[] quizNumber = getQuizNumber();
        // 해당 id값으로 퀴즈들 가져옴
        long quizId; // 문제 id
        int location; // 정답 삽입 위치
        List<QuizDTO> quizList = new ArrayList<>();
        for (int i = 0; i < num; i ++) {
            quizId = quizNumber[i];
            location = (int) quizId%4;
            // 퀴즈 문항, 정답, 오답 불러오기

            // 문항
            Optional<Quiz> quiz = quizService.getQuiz(quizId);
            // 정답
            Optional<QuizCorrect> quizCorrect = quizService.getQuizCorrect(quizId);
            // 오답들
            List<QuizIncorrect> quizIncorrects = quizService.getQuizIncorrects(quizId);

            // DTO수준에서 정답의 위치를 임의로 지정, List의 어느 위치에 정답이 있는지 알려줌
            QuizDTO quizDTO = new QuizDTO();
            quizDTO.setQuizId(quizId);
            quizDTO.setQuestion(quiz.get().getQuizQuestion()); // 퀴즈 문항
            // 정답의 위치는 quizId기준 4의 나머지값으로 임의로 설정
            quizDTO.setAnswerNumber(quizId%4+1); // List상에 퀴즈 정답이 어디에 위치해있는가의 위치 0~3의 값
            List<String> strList = new ArrayList<>();
            for (int index = 0; index < 3; index ++) {
                strList.add(quizIncorrects.get(index).getIncorrectAnswer());
                logger.info(quizIncorrects.get(index).getIncorrectAnswer());
            }

            strList.add(location, quizCorrect.get().getCorrectAnswer());
            quizDTO.setSelectList(strList);
            logger.info("Quiz ID: " + quizId);
            logger.info("퀴즈 문항"+quiz.get().getQuizQuestion());
            logger.info("퀴즈 정답 : "+quizCorrect.get().getCorrectAnswer());
            logger.info("퀴즈 오답들 중 한개 : "+quizIncorrects.get(0).getIncorrectAnswer());
            logger.info("퀴즈들 : "+strList.toString());
            logger.info("퀴즈 정답 위치 : "+location);
            quizList.add(quizDTO);
        }
        return ResponseEntity.ok().body(quizList);
    }

    // 10.01 시점 기준 id기준 2~80개의 퀴즈가 있으니 79개를 선별하겠다고 가정
    // 퀴즈 번호 랜덤 뽑기
    public long[] getQuizNumber() {
        List<Long> temp = new ArrayList<>();
        for (long i = 2; i<= 80; i ++) {
            temp.add(i);
        }
        // 2~80를 섞음
        Collections.shuffle(temp);
        long[] quizNumber = new long[num];
        for (int i = 0; i < num; i++) {
            quizNumber[i] = temp.get(i);
        }
        return quizNumber;
    }
}
