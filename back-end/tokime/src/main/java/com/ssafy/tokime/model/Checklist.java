package com.ssafy.tokime.model;

import com.ssafy.tokime.dto.ChecklistDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Checklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer checklistId;

    @Column(nullable = false)
    private String content;

    public ChecklistDTO toDto(){
        return ChecklistDTO.builder().
                checklistId(this.checklistId)
                .content(this.content)
                .build();
    }

}
