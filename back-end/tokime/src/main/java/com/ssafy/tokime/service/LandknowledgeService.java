package com.ssafy.tokime.service;

import com.ssafy.tokime.model.Landknowledge;
import com.ssafy.tokime.model.Likeword;
import com.ssafy.tokime.repository.LandknowledgeRepository;
import com.ssafy.tokime.repository.LikeWordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LandknowledgeService {
    @Autowired
    private LandknowledgeRepository landknowledgeRepository;
    @Autowired
    private LikeWordRepository likeWordRepository;

    // 상식 단어들 모두 가져오기
    public List<String> getWordList() {
        return landknowledgeRepository.getWordList();
    }

    // 특정 상식 단어의 세부내용 가져오기
    public Optional<Landknowledge> getLandknowledge(long id) {
        return landknowledgeRepository.findById(id);
    }

    // 즐겨찾기 용어 목록 가져오기
    public Optional<Likeword> getLikeWord(long id) {
        return likeWordRepository.findById(id);
    }


    // 즐겨찾기 용어 추가 및 해제, 그리고 최초 실행시 테이블 생성용
    // 변경사항 있을 시 먼저 용어 목록 가져오고 테이블 갱신
    public void updateLikeWord(Likeword likeWord) {
        likeWordRepository.save(likeWord);
    }

}
