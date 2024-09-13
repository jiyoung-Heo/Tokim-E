package com.ssafy.tokime.service;

import com.ssafy.tokime.model.User;
import com.ssafy.tokime.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User signIn(User user) {
        return userRepository.save(user);
    }

    public void signOut() {
        var cookie = new javax.servlet.http.Cookie(COOKIE_NAME, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);
    }

    public void deleteUser(String email) {
        User user = selectUserInfoByEmail(email);
        user.setIsDeleted(true);
    }

    public User updateQuizScore(String email, Long quizScore) {
        User user = selectUserInfoByEmail(email);
        user.setQuizScore(quizScore);
        return userRepository.save(user);
    }

    public User selectUserInfoByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
    }
}
