package com.ssafy.tokime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Land {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "land_id", nullable = false)
    private Long landId;

    @Column(name = "land_district_code", nullable = true)
    private Integer landDistrictCode;

    @Column(name = "land_district", length = 50, nullable = true)
    private String landDistrict;

    @Column(name = "land_address", length = 50, nullable = true)
    private String landAddress;

    @Column(name = "land_address_name", length = 50, nullable = true)
    private String landAddressName;

    @Column(name = "land_scale", nullable = true)
    private Float landScale;

    @Column(name = "land_use", length = 50, nullable = true)
    private String landUse;

    @Column(name = "land_use_status", length = 50, nullable = true)
    private String landUseStatus;

    @Column(name = "land_gradient", length = 50, nullable = true)
    private String landGradient;

    @Column(name = "land_road", length = 50, nullable = true)
    private String landRoad;

    @Column(name = "land_price", nullable = true)
    private Integer landPrice;

    @Column(name = "land_danger", nullable = true)
    private Integer landDanger;

}
