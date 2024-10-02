package com.ssafy.tokime.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAverageDTO {
    // 해당 사용자의 점수
    private Long quizScore;
    // 사용자의 동일 연령대 평균
    private Long ageAverage;
    // 또래 기준 몇점 더 높은가, 높으면 양수 낮으면 음수
    private Long ageGap;
    // 사용자 점수 기반 상위 n%
    private Long top;
    // 토키미 전체 평균
    private Long totalAverage;
}
