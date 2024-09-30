package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Landterm;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LandtermDTO {
    private Long termId;
    private String termName;
    private String termDescribe;
    private String termLaw;
    private boolean likeCheck; // 즐찾인지 아닌지 표시하는 곳

    public LandtermDTO(Landterm landterm) {
        this.termId = landterm.getTermId();
        this.termName = landterm.getTermName();
        this.termDescribe = landterm.getTermDescribe();
        this.termLaw = landterm.getTermLaw();
    }

    public static Landterm toEntity(final LandtermDTO dto) {
        return Landterm.builder()
                .termId(dto.getTermId())
                .termName(dto.getTermName())
                .termDescribe(dto.getTermDescribe())
                .termLaw(dto.getTermLaw())
                .build();
    }
}
