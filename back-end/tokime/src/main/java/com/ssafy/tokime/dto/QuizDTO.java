package com.ssafy.tokime.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizDTO {
    // 퀴즈 id
    private Long quizId;
    // 해당 퀴즈의 정답 번호 - list에 정답이 있는 위치 + 1 => 바로 번호선택이랑 비교하면됨!
    private Long answerNumber;
    // 문항 - quiz
    private String question;
    // 사지선다 - inco + co
    private String[] selectList;

}
