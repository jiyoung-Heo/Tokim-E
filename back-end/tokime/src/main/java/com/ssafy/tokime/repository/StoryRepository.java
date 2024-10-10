package com.ssafy.tokime.repository;


import com.ssafy.tokime.model.Story;
import com.ssafy.tokime.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story,Integer> {
    List<Story> findStoryByUser(User user);

}
