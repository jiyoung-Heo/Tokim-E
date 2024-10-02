package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Danger;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class DangerDetailDTO {
    private String landId;
    private String dangerTitle;
    private String dangerContent;

    public DangerDetailDTO(Danger danger) {
        this.landId = danger.getLandId();
        this.dangerTitle = danger.getDangerTitle();
        this.dangerContent = danger.getDangerContent();
    }
}
