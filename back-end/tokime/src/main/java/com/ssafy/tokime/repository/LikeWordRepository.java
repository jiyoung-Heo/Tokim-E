package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Likeword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeWordRepository extends JpaRepository<Likeword, Long> {

    //해당 사용자의 모든 즐겨찾기 단어 가져오기
    List<Likeword> findAllByUserIdOrderByTermId(Long userId);


}
