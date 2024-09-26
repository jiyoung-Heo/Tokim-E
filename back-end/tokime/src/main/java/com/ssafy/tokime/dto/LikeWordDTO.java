package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Likeword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeWordDTO {
    private Long LikewordId;

    // 즐겨찾기 목록은 "1,2,3,4"이런 방식으로 저장됨
    // 백에서 해당 문자열을 [1,2,3,4]로 변환해서 사용함
    private String wordList;

    public LikeWordDTO(Likeword likeWord) {
        this.LikewordId = likeWord.getLikewordId();
        this.wordList = likeWord.getWordList();
    }
}
