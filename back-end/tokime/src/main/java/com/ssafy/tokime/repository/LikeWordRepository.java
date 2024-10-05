package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Likeword;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeWordRepository extends JpaRepository<Likeword, Long> {

    //해당 사용자의 모든 즐겨찾기 단어 가져오기
    @Query("SELECT l FROM Likeword l WHERE l.userId = :userId")
    List<Likeword> findAllByUserIdOrderByTermId(@Param("userId") Long userId);

    //해당 사용자의 특정 즐겨찾기 단어 삭제
    @Transactional
    @Modifying
    @Query(value="DELETE FROM Likeword l where l.userId = :userId AND l.termId = :termId")
    void deleteByUserIdAndTermId(@Param("userId") Long userId, @Param("termId") Long termId);

}
