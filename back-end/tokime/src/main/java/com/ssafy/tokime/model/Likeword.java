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
public class Likeword {
    @Id
    @Column(name="likeword_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likewordId;

    @Column(name="user_id")
    private Long userId;

    @Column(name="term_id")
    private Long termId;
}
