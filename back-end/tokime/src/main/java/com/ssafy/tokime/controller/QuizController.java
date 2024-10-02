package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.QuizAverageDTO;
import com.ssafy.tokime.dto.QuizDTO;
import com.ssafy.tokime.model.Quiz;
import com.ssafy.tokime.model.QuizCorrect;
import com.ssafy.tokime.model.QuizIncorrect;
import com.ssafy.tokime.model.User;
import com.ssafy.tokime.service.QuizService;
import com.ssafy.tokime.service.UserService;
import com.ssafy.tokime.service.facade.UserFacadeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/quiz")
public class QuizController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private QuizService quizService;
    @Autowired
    private UserFacadeService userFacadeService;
    @Autowired
    private UserService userService;
    private static User user;

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
            quizList.add(quizDTO);
        }
        return ResponseEntity.ok().body(quizList);
    }

    @GetMapping("/average")
    public ResponseEntity<?> getQuizAverage() {
        getUserInfo();
        QuizAverageDTO quiz = new QuizAverageDTO();

        // 1. 사용자 점수
        quiz.setQuizScore(user.getQuizScore());


        // 2. 또래 평균
        List<Long> scoreList = new ArrayList<>();
        if (user.getBirth() != null) {
            int birth = user.getBirth().getYear()+1900;
            scoreList = userService.getQuizScores(birth, birth+1);
            quiz.setAgeAverage(getAverage(scoreList));
        } else { //
            quiz.setAgeAverage(0L);
        }


        // 사용자 전부의 점수를 가져옴
        scoreList = userService.getAllQuizScores();
        // 4. 토키미 전체 평균
        quiz.setTotalAverage(getAverage(scoreList));

        if (quiz.getQuizScore() == -1) { // 상식퀴즈를 한번도 진행하지 않았다면 디폴트값으로 -1을 가짐
            // 퀴즈 푼 내역이 없으면 제공받을 수 있는 부분은 또래평균만 알 수 있음
            // 나머지 값은 디폴트값으로
            quiz.setTop(0L);
            quiz.setAgeGap(0L);

        } else {
            // 3. 사용자의 점수와 또래 평균 차이
            if (user.getBirth() != null) {
                quiz.setAgeGap(quiz.getQuizScore()-quiz.getAgeAverage());
            } else {
                quiz.setAgeGap(0L);
            }


            // 5. 상위 n%
            // 상위 n%는 중복값을 제거
            Set<Long> set = new HashSet<>(scoreList);
            scoreList = new ArrayList<>(set);
            Collections.sort(scoreList, Collections.reverseOrder());
            System.out.println(scoreList);
            quiz.setTop(getPercent(scoreList,quiz.getQuizScore()));
        }
        return ResponseEntity.ok().body(quiz);
    }

    // 10.01 시점 기준 id기준 2~80개의 퀴즈가 있으니 79개를 선별하겠다고 가정 -> 1~86으로 정정
    // 퀴즈 번호 랜덤 뽑기
    public long[] getQuizNumber() {
        List<Long> temp = new ArrayList<>();
        for (long i = 1; i<= 86; i ++) {
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

    // 상위 n프로인지 반환해주는 메서드
    public Long getPercent(List<Long> list, Long score) {
        int start = 0;
        int end = list.size() - 1;
        // 특정 이상일때까지 계속 돌린다
        while (start <= end) {
            int mid = (start + end) / 2;
            Long temp = list.get(mid);
            if (temp == score) {
                double result = (((double) (mid+1)/list.size()));
                long r = (long) (result*100);
                return r;
            }
            if (score > temp) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return 1L;
    }

    // 평균 점수 반환
    public Long getAverage(List<Long> list) {
        long total = 0;
        for (Long i : list) {
            total += i;
        }
        return total / list.size();
    }

    // 유저 정보 가져오기
    public void getUserInfo() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        user = userFacadeService.getUserInfo(email);
    }
}
