package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Landknowledge;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LandknowledgeDTO {
    private Long knowledgeCategory;
    private String knowledgeName;
    private String knowledgeDescribe;
    private String knowledgeImageUrl;

    public LandknowledgeDTO(final Landknowledge entity){
        this.knowledgeCategory = entity.getKnowledgeCategory();
        this.knowledgeName = entity.getKnowledgeName();
        this.knowledgeDescribe = entity.getKnowledgeDescribe();
        this.knowledgeImageUrl = entity.getKnowledgeImageUrl();
    }

    public static Landknowledge toEntity(final LandknowledgeDTO dto){
        return Landknowledge.builder()
                .knowledgeCategory(dto.getKnowledgeCategory())
                .knowledgeName(dto.getKnowledgeName())
                .knowledgeDescribe(dto.getKnowledgeDescribe())
                .knowledgeImageUrl(dto.getKnowledgeImageUrl())
                .build();
    }
}
