package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Avatar;
import com.ssafy.tokime.model.Landknowledge;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LandknowledgeDTO {
    private Long knowledgeId;
    private String knowledgeWord;
    private String knowledgeDescribe;
    private String knowledgeLaw;

    public LandknowledgeDTO(Landknowledge landknowledge) {
        this.knowledgeId = landknowledge.getKnowledgeId();
        this.knowledgeWord = landknowledge.getKnowledgeWord();
        this.knowledgeDescribe = landknowledge.getKnowledgeDescribe();
        this.knowledgeLaw = landknowledge.getKnowledgeLaw();

    }

    public static Landknowledge toEntity(final LandknowledgeDTO dto) {
        return Landknowledge.builder()
                .knowledgeId(dto.getKnowledgeId())
                .knowledgeWord(dto.getKnowledgeWord())
                .knowledgeDescribe(dto.getKnowledgeDescribe())
                .knowledgeLaw(dto.getKnowledgeLaw())
                .build();
    }
}
