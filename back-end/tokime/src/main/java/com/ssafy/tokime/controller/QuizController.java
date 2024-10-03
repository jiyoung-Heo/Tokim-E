package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.QuizAverageDTO;
import com.ssafy.tokime.dto.QuizDTO;
import com.ssafy.tokime.model.*;
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
    private static final Logger logger = LoggerFactory.getLogger(QuizController.class);

    @Autowired
    private QuizService quizService;
    @Autowired
    private UserFacadeService userFacadeService;
    @Autowired
    private UserService userService;
    private static User user;

    // 특정 퀴즈 조회
    @GetMapping("")
    public ResponseEntity<?> getQuiz() {
        try {
            List<Object[]> quizList = quizService.getQuizList();
            List<QuizDTO> quizDTOList = new ArrayList<>();
            int cnt = 0;
            QuizDTO quizDTO = new QuizDTO();
            for (int repeat = 0; repeat < 20; repeat++) {
                int start = repeat * 3;
                int location = 0;
                int ind = 0;
                if (quizDTO.getSelectList() == null) {
                    quizDTO.setSelectList(new String[4]);
                    quizDTO.setQuizId((Long) quizList.get(start)[0]);
                    quizDTO.setQuestion((String) quizList.get(start)[1]);
                    quizDTO.setAnswerNumber((quizDTO.getQuizId() % 4) + 1);
                    location = (int) (quizDTO.getQuizId() % 4);
                }
                for (int i = 0; i < 3; i++) {
                    int index = start + i;
                    String select = (String) quizList.get(index)[3];
                    if (ind == location) {
                        quizDTO.getSelectList()[ind] = (String) quizList.get(index)[2];
                        ind++;
                    }
                    quizDTO.getSelectList()[ind] = select;
                    ind++;
                }
                if (location == 3) {
                    quizDTO.getSelectList()[ind] = (String) quizList.get(start)[2];
                }
                quizDTOList.add(quizDTO);
                quizDTO = new QuizDTO();
            }
            return ResponseEntity.ok().body(quizDTOList);
        }catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/average")
    public ResponseEntity<?> getQuizAverage() {
        try {
            getUserInfo();
            QuizAverageDTO quiz = new QuizAverageDTO();

            // 1. 사용자 점수
            quiz.setQuizScore(user.getQuizScore());


            // 2. 또래 평균
            List<Long> scoreList = new ArrayList<>();
            if (user.getBirth() != null) {
                int birth = user.getBirth().getYear() + 1900;
                int start = birth-(birth%10);
                int end = start+9;
                scoreList = userService.getQuizScores(start, end);
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
                    quiz.setAgeGap(quiz.getQuizScore() - quiz.getAgeAverage());
                } else {
                    quiz.setAgeGap(0L);
                }


                // 5. 상위 n%
                // 상위 n%는 중복값을 제거
                Set<Long> set = new HashSet<>(scoreList);
                scoreList = new ArrayList<>(set);
                Collections.sort(scoreList, Collections.reverseOrder());
                System.out.println(scoreList);
                quiz.setTop(getPercent(scoreList, quiz.getQuizScore()));
            }
            return ResponseEntity.ok().body(quiz);
        }
        catch (Exception e) {
            logger.error("Error while quiz average", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 상위 n%만 반환해주는 메서드
    @GetMapping("/percent")
    public ResponseEntity<?> getQuizAverageN() {
        try {
            getUserInfo();
            List<Long> scoreList = userService.getAllQuizScoreDistinct();
            logger.info("가져온 점수들 : "+scoreList.toString());
            return ResponseEntity.ok().body(getPercent(scoreList, user.getQuizScore()));
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
        logger.info("가져오려는 유저의 정보 : "+email);
        user = userFacadeService.getUserInfo(email);
    }
}
