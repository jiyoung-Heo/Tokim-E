package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.ResponseDTO;
import com.ssafy.tokime.dto.UserDTO;
import com.ssafy.tokime.model.User;
import com.ssafy.tokime.service.facade.UserFacadeService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.authorization.AuthoritiesAuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController{
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserFacadeService userService;
    private final WebClient webClient;

    public UserController(UserFacadeService userFacadeService, WebClient.Builder webClientBuilder){
        this.userService = userFacadeService;
        this.webClient = webClientBuilder.build();

    }

    // 유저 탈퇴
    @DeleteMapping("")
    public ResponseEntity<?> removeUser(HttpServletRequest request){
        try{
            String email = getAuthenticationData();
            User user = userService.getUserInfo(email);

            // 쿠키에서 Authorization 쿠키 값 가져오기
            String accessToken = getCookieValue(request, "access-token");
            logger.info("Access token: " + accessToken);
            if (accessToken == null) {
                logger.error("accessToken is null");
                ResponseDTO<Void> response = ResponseDTO.<Void>builder().error("jwtToken is null").build();
                return ResponseEntity.badRequest().body(response);
            }

            if(user.getProvider().equals("kakao")){

                webClient.post()
                        .uri("https://kapi.kakao.com/v1/user/unlink")
                        .header("Authorization", "Bearer " + accessToken)
                        .retrieve()
                        .bodyToMono(String.class)
                        .onErrorResume(e -> Mono.error(new RuntimeException("카카오 탈퇴 실패")))
                        .block(); // 응답을 블로킹하여 기다림
                ;
                logger.info("탈퇴성공");

            }else if(user.getProvider().equals("google")){
                webClient.post()
                        .uri("https://accounts.google.com/o/oauth2/revoke?token=" + accessToken)
                        .retrieve()
                        .bodyToMono(String.class)
                        .onErrorResume(e -> Mono.error(new RuntimeException("구글 탈퇴 실패")))
                        .block(); // 응답을 블로킹하여 기다림
                ;
                logger.info("탈퇴성공");

            }
            userService.removeUser(email);

            return ResponseEntity.ok().build();
        } catch (Exception e){
            logger.error("Error during user removal", e);
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }


    // 유저 정보 조회
    @GetMapping("")
    private ResponseEntity<?> getUserInfo(){
        try {
            String email = getAuthenticationData();
            logger.info(email);
            User user = userService.getUserInfo(email);
            logger.info(user.toString());

            UserDTO dto = new UserDTO(user);
            ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            logger.error("Error while retrieving user information", e);
            ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("")
    private ResponseEntity<?> updateUserBirth(@RequestParam(name = "birth") String birth){
        SimpleDateFormat format = new SimpleDateFormat("yyyy");
        try {
            String email = getAuthenticationData();

            Date birthDate = format.parse(birth);
            logger.info(birthDate.toString());
            User updatedUser = userService.modifyUserInfo(email, birthDate);

            UserDTO dto = new UserDTO(updatedUser);
            logger.info(dto.getBirth().toString());

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
    public ResponseEntity<?> updateQuizScore(@RequestBody UserDTO userDTO){
        try {
            String email = getAuthenticationData();

            User user = userService.updateQuizScore(email, userDTO.getQuizScore());

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

    // 쿠키에서 특정 쿠키의 값을 찾는 메서드
    private String getCookieValue(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                logger.info(cookie.getName());
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue(); // 해당 쿠키의 값 반환
                }
            }
        }
        return null; // 해당 쿠키가 없을 때 null 반환
    }
}