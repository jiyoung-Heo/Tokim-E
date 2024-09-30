package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Law;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LawDTO {
    private String lawName;
    private String lawContent;
    private String lawItemNumber;
    private String lawLandUse;
    private Date lawImplementAt;

    public LawDTO(final Law entity){
        this.lawName = entity.getLawName();
        this.lawContent = entity.getLawContent();
        this.lawItemNumber = entity.getLawItemNumber();
        this.lawLandUse = entity.getLawLandUse();
        this.lawImplementAt = entity.getLawImplementAt();
    }

    public static Law toEntity(final LawDTO dto){
        return Law.builder()
                .lawName(dto.getLawName())
                .lawContent(dto.getLawContent())
                .lawItemNumber(dto.getLawItemNumber())
                .lawLandUse(dto.getLawLandUse())
                .lawImplementAt(dto.getLawImplementAt())
                .build();
    }
}
