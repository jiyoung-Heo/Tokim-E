package com.ssafy.tokime.service.facade;

import com.ssafy.tokime.model.User;
import com.ssafy.tokime.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Transactional
@Service
public class UserFacadeService {

    private UserService userService;

    public UserFacadeService(UserService userService){
        this.userService = userService;
    }

    // 이메일로 유저 삭제
    public void removeUser(String email){userService.deleteUser(email);}

    // 이메일로 유저 조회
    public User getUserInfo(String email){return userService.selectUserInfoByEmail(email);}

    // 이메일로 유저 조회 후 생년월일 수정
    public User modifyUserInfo(String email, Date birth){return userService.updateBirth(email, birth);}

    // 토지 점수 수정 Quiz 부분과 연계
    public User updateQuizScore(String email, Long quizScore){
        User user = userService.selectUserInfoByEmail(email);
        user.setQuizScore(quizScore);
        return user;
    }
}
