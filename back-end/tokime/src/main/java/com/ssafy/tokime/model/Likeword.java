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
public class Likeword {
    // 즐겨찾기 용어 id는 유저 id와 동일함
    @Id
    @Column(name="likeword_id")
    private Long LikewordId;

    // 즐겨찾기 목록은 "1,2,3,4"이런 방식으로 저장됨
    // 백에서 해당 문자열을 [1,2,3,4]로 변환해서 사용함
    @Column(name="word_list", length = 5000) // 1~635전부 추가할 경우
    private String wordList;
}
