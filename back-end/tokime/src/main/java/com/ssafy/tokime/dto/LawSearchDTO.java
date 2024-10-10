package com.ssafy.tokime.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LawSearchDTO {

    private Long lawDistrict;
    private String lawLandUse;
}
