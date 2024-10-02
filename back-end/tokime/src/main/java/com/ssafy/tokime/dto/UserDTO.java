package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private static SimpleDateFormat format = new SimpleDateFormat("yyyy");
    private String name;
    private String email;
    private String birth;
    private int phone;
    private Long quizScore;

    public UserDTO(final User entity) {
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.birth = format.format(entity.getBirth());
        this.phone = entity.getPhone();
        this.quizScore = entity.getQuizScore();
    }

    public static User toEntity(UserDTO dto) throws ParseException {
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .birth(format.parse(dto.getBirth()))
                .phone(dto.getPhone())
                .quizScore(dto.getQuizScore())
                .build();
    }
}
