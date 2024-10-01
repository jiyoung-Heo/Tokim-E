package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.ResponseDTO;
import com.ssafy.tokime.dto.UserDTO;
import com.ssafy.tokime.model.User;
import com.ssafy.tokime.service.facade.UserFacadeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController{
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserFacadeService userService;

    public UserController(UserFacadeService userFacadeService){
        this.userService = userFacadeService;
    }

    // 유저 탈퇴
    @DeleteMapping("/")
    public ResponseEntity<?> removeUser(){
        try{
            String email = getAuthenticationData();
            userService.removeUser(email);

            return ResponseEntity.ok().build();
        } catch (Exception e){
            logger.error("Error during user removal", e);
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // 유저 정보 조회
    @GetMapping("/")
    private ResponseEntity<?> getUserInfo(){
        try {
            String email = getAuthenticationData();
            User user = userService.getUserInfo(email);
            UserDTO dto = new UserDTO(user);
            ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            logger.error("Error while retrieving user information", e);
            ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/")
    private ResponseEntity<?> updateUserBirth(@RequestBody Date birth){
        try {
            String email = getAuthenticationData();
            User updatedUser = userService.modifyUserInfo(email, birth);

            UserDTO dto = new UserDTO(updatedUser);
            ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            logger.error("Error while updating user birth", e);
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }


    @GetMapping("/quiz")
    public ResponseEntity<?> getQuizScore() {
        try {
            String email = getAuthenticationData();
            User user = userService.getUserInfo(email);

            Long quizScore = user.getQuizScore();
            ResponseDTO<Long> response = ResponseDTO.<Long>builder().data(List.of(quizScore)).build();
//            UserDTO dto = new UserDTO(user);
//            ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().data(List.of(dto)).build();
            return ResponseEntity.ok().body(response);

        } catch (Exception e) {
            logger.error("Error while retrieving score information", e);
            ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/quiz")
    public ResponseEntity<?> updateQuizScore(@RequestBody Long quizScore){
        try {
            String email = getAuthenticationData();

            User user = userService.updateQuizScore(email, quizScore);

            UserDTO dto = new UserDTO(user);
            ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            logger.error("Error while updating quiz score", e);
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
    // 인증해서 데이터 가져오기
    private String getAuthenticationData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}