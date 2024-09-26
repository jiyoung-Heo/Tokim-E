package com.ssafy.tokime.repository;

import com.ssafy.tokime.model.Likeword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeWordRepository extends JpaRepository<Likeword, Long> {
}
