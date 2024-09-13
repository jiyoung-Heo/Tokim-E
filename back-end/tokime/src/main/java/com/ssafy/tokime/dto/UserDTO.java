package com.ssafy.tokime.dto;

import com.edu.koplay.model.Parent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String name;
    private String email;
    private int phone;
    private Long quizScore;

    public UserDTO(final User entity) {
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.phone = entity.getPhone();
        this.quizScore = entity.getQuizScore();
    }

    public static User toEntity(final UserDTO dto) {
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .quizScore(dto.getQuizScore())
                .build();
    }
}
