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
public class Landknowledge {
    public Landknowledge(Long landKnowledge2Id){this.knowledgeId = knowledgeId; }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long knowledgeId;

    @Column(nullable = false)
    private Long knowledgeCategory;

    @Column(nullable = false)
    private String knowledgeName;

    @Column(nullable = false)
    private String knowledgeDescribe;

    @Column(nullable = false)
    private String knowledgeImageUrl;
}
