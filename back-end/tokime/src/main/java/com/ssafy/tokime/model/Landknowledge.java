package com.ssafy.tokime.model;

import com.ssafy.tokime.dto.LandknowledgeDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Landknowledge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long knowledgeId;

    @Column(name="knowledge_word", nullable = false, length = 200)
    private String knowledgeWord;

    @Column(name="knowledge_describe", nullable = false, length = 4000)
    private String knowledgeDescribe;

    @Column(name="knowledge_law", length = 700)
    private String knowledgeLaw;

}

