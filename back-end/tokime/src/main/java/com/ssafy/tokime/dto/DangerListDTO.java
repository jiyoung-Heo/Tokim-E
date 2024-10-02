package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Danger;

public class DangerListDTO {
    private Long dangerId;
    private String dangerTitle;

    public DangerListDTO(Danger danger) {
        this.dangerId = danger.getDangerId();
        this.dangerTitle = danger.getDangerTitle();
    }
}
