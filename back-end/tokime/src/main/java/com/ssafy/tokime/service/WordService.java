package com.ssafy.tokime.service;

import com.ssafy.tokime.model.Landterm;
import com.ssafy.tokime.model.Likeword;
import com.ssafy.tokime.repository.WordRepository;
import com.ssafy.tokime.repository.LikeWordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WordService {
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private LikeWordRepository likeWordRepository;

    // 상식 단어 저장하기
    public void saveLandTerm(Landterm landterm) {
        wordRepository.save(landterm);
    }
    // 상식 단어들 모두 가져오기
    public List<Landterm> getWordList() {
        return wordRepository.getWordList();
    }

    // 검색 키워드에 해당하는 상식 단어들 모두 가져오기
    public List<Landterm> getSearchWordList(String word) {
        return wordRepository.findBytermNameContaining(word);
    }

    // 특정 상식 단어의 세부내용 가져오기
    public Optional<Landterm> getWord(long id) {
        return wordRepository.findById(id);
    }

    // 즐겨찾기 용어 목록 가져오기
    public List<Likeword> getLikeWordList(long id) {
        return likeWordRepository.findAllByUserIdOrderByTermId(id);
    }

    // 즐겨찾기 등록
    public void saveLikeWord(Likeword likeword) {
        likeWordRepository.save(likeword);
    }

    // 즐겨찾기 해제
    public void deleteLikeWord(Long userId, Long wordId) {
        likeWordRepository.deleteLikeWord(userId, wordId);
    }

}
