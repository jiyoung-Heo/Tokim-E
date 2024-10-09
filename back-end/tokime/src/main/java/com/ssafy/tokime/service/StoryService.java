package com.ssafy.tokime.service;

import com.ssafy.tokime.dto.StoryDTO;
import com.ssafy.tokime.model.Story;
import com.ssafy.tokime.model.User;
import com.ssafy.tokime.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class StoryService {
    @Autowired
    StoryRepository repository;

    public List<Story> findStoryByUser(User user) {
        return repository.findStoryByUser(user);
    }

    public List<Story> addStory(StoryDTO dto, User user) throws ParseException {
        Story story = StoryDTO.toEntity(dto);
        story.setUser(user);
        repository.save(story);
        return repository.findStoryByUser(user);
    }


}
