package com.ssafy.tokime.service.facade;

import com.ssafy.tokime.model.User;
import com.ssafy.tokime.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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

    // 토지 점수 수정 Quiz 부분과 연계
}
