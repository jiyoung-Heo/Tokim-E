package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Danger;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DangerListDTO {
    private Long dangerId;
    private String dangerTitle;

    public DangerListDTO(Danger danger) {
        this.dangerId = danger.getDangerId();
        this.dangerTitle = danger.getDangerTitle();
    }
}
