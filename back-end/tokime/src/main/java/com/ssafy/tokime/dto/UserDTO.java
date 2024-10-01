package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String name;
    private String email;
    private Date birth;
    private int phone;
    private Long quizScore;

    public UserDTO(final User entity) {
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.birth = entity.getBirth();
        this.phone = entity.getPhone();
        this.quizScore = entity.getQuizScore();
    }

    public static User toEntity(final UserDTO dto) {
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .birth(dto.getBirth())
                .phone(dto.getPhone())
                .quizScore(dto.getQuizScore())
                .build();
    }
}
