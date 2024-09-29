package com.ssafy.tokime.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LandDTO {
    private String landId;
    private Long landDistrictCode;
    private String landDistrict;
    private String landAddress;
    private String landAddressName;
    private Float landScale;
    private String landUse;
    private String landUseStatus;
    private String landGradient;
    private String landRoad;
    private Integer landPrice;
    private Integer landDanger;
}