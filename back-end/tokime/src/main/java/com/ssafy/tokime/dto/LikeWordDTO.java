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
    // 사용자 id
    private Long userId;
    // 즐겨찾기 한 단어의 id
    private Long temdId;

    public LikeWordDTO(Likeword likeWord) {
        this.LikewordId = likeWord.getLikewordId();
        this.temdId = likeWord.getTermId();
    }
}
