package com.ssafy.tokime.service;

import com.ssafy.tokime.model.User;
import com.ssafy.tokime.repository.LikeWordRepository;
import com.ssafy.tokime.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private UserRepository userRepository;
    private LikeWordRepository likeWordRepository;

    @Autowired
    public UserService(UserRepository userRepository, LikeWordRepository likeWordRepository) {
        this.userRepository = userRepository;
        this.likeWordRepository = likeWordRepository;
    }

    public User signIn(User user) {
        return userRepository.save(user);
    }

    public void signOut() {
    }

    public void deleteUser(String email) {
        User user = selectUserInfoByEmail(email);
        user.setIsDeleted(true);
        likeWordRepository.deleteByEmail(user.getEmail());
    }

    public User updateQuizScore(String email, Long quizScore) {
        User user = selectUserInfoByEmail(email);
        user.setQuizScore(quizScore);
        return userRepository.save(user);
    }

    public User updateBirth(String email, Date birth){
        User user = selectUserInfoByEmail(email);
        user.setBirth(birth);
        return userRepository.save(user);
    }

    public User selectUserInfoByEmail(String email) {
        return userRepository.findByEmailIsDeletedFalse(email).orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
    }

    // 특정 출생년도 기준의 사용자의 퀴즈 점수 모두 가져오기
    public List<Long> getQuizScores(int startYear, int endYear) {
        return userRepository.findQuizScoreByBirthYearBetween(startYear, endYear);
    }

    // 토키미 전체 사용자의 퀴즈 점수 모두 가져오기
    public List<Long> getAllQuizScores() {
        return userRepository.findAllByQuizScore();
    }

    // 토키미 전체 사용자의 퀴즈 점수 중복제거 후 가져오기
    public List<Long> getAllQuizScoreDistinct() {
        return userRepository.findAllByQuizScoreDistinct();
    }

    // 토키미 전체 사용자 퀴즈 점수 분포도
    public List<Object[]> getQuizList() {
        return userRepository.findAllByScoreList();
    }
}
