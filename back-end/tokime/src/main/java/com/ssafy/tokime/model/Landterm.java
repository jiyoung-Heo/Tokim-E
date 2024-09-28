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
public class Landterm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long termId;

    @Column(name="term_name", nullable = false, length = 200)
    private String termName;

    @Column(name="term_describe", nullable = false, length = 4000)
    private String termDescribe;

    @Column(name="term_law", length = 700)
    private String termLaw;

}

