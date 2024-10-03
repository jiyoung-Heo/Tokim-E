package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    // 특정 연령대의 퀴즈점수 모두 가져오기 - 중복 허용 X 내림차순으로
    @Query("SELECT DISTINCT u.quizScore FROM User u WHERE YEAR(u.birth) BETWEEN :startYear AND :endYear order by u.quizScore desc")
    List<Long> findQuizScoreByBirthYearBetween(@Param("startYear") int startYear, @Param("endYear") int endYear);

    // 모든 연령대 퀴즈점수 모두 가져오기 - 중복 허용
    @Query("SELECT u.quizScore FROM User u order by u.quizScore desc")
    List<Long> findAllByQuizScore();

    // 모든 연령대 쥐크점수 모두 가져오기 - 중복 허용 X
    @Query("SELECT DISTINCT u.quizScore FROM User u order by u.quizScore desc")
    List<Long> findAllByQuizScoreDistinct();
}
