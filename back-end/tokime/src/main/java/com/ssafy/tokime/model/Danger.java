package com.ssafy.tokime.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Danger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dangerId;

    // 위도
    @Column(name = "lat", nullable = false)
    private double lat;

    // 경도
    @Column(name="lng", nullable = false)
    private double lng;

    @Column(name = "danger_title", nullable = false)
    private String dangerTitle;

    @Column(name = "danger_content", nullable = false, length = 1500)
    private String dangerContent;

}
