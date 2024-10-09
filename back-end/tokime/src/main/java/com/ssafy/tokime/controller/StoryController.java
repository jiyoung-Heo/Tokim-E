package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.ResponseDTO;
import com.ssafy.tokime.dto.StoryDTO;
import com.ssafy.tokime.model.Story;
import com.ssafy.tokime.model.User;
import com.ssafy.tokime.service.StoryService;
import com.ssafy.tokime.service.facade.UserFacadeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/story")
public class StoryController {
    private UserFacadeService userService;
    private StoryService storyService;

    public StoryController(UserFacadeService userFacadeService, StoryService storyService){
        this.userService = userFacadeService;
        this.storyService = storyService;
    }

    //유저의 전체 스토리 불러오기
    @GetMapping("")
    private ResponseEntity<?> getStory() {
        String email = getAuthenticationData();
        User user = userService.getUserInfo(email);
        List<Story> storys = storyService.findStoryByUser(user);

        List<StoryDTO> result = new ArrayList<>();
        for(Story story : storys){
            result.add(new StoryDTO(story.getStory()));
        }

        ResponseDTO<StoryDTO> response = ResponseDTO.<StoryDTO>builder().data(result).build();

        return ResponseEntity.ok().body(response);
    }

    @PostMapping("")
    private ResponseEntity<?> addStory(@RequestBody StoryDTO story) throws ParseException {
        String email = getAuthenticationData();
        User user = userService.getUserInfo(email);

        List<Story> storys = storyService.addStory(story, user);

        List<StoryDTO> result = new ArrayList<>();
        for(Story storyStirng : storys){
            result.add(new StoryDTO(storyStirng.getStory()));
        }

        ResponseDTO<StoryDTO> response = ResponseDTO.<StoryDTO>builder().data(result).build();

        return ResponseEntity.ok().body(response);
    }

    // 인증해서 데이터 가져오기
    private String getAuthenticationData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
