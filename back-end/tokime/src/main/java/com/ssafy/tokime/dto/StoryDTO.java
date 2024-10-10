package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Story;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoryDTO {
    private String story;

    public static Story toEntity(StoryDTO dto) throws ParseException {
        return Story.builder()
                .story(dto.getStory())
                .build();
    }
}
