package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Land;
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

    public Land toEntity(){
        return Land.builder()
                .landId(landId)
                .landDistrictCode(landDistrictCode)
                .landAddress(landAddress)
                .landDistrict(landDistrict)
                .landScale(landScale)
                .landUse(landUse)
                .landUseStatus(landUseStatus)
                .landGradient(landGradient)
                .landRoad(landRoad)
                .landPrice(landPrice)
                .landDanger(landDanger)
                .build();
    }


}