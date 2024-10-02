package com.ssafy.tokime.model;

import com.ssafy.tokime.dto.DangerDetailDTO;
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

//    @Column(name = "user_id", nullable = false)
//    private Long userId;

    @Column(name = "land_id", nullable = false)
    private String landId;

    @Column(name = "danger_title", nullable = false)
    private String dangerTitle;

    @Column(name = "danger_content", nullable = false, length = 1500)
    private String dangerContent;

    public Danger(DangerDetailDTO detail) {

    }
}
