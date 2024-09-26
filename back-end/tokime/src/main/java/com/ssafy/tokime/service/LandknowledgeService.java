package com.ssafy.tokime.service;

import com.ssafy.tokime.model.Landknowledge;
import com.ssafy.tokime.repository.LandknowledgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LandknowledgeService {
    @Autowired
    private LandknowledgeRepository landknowledgeRepository;

    // 임시
    // 상식 단어들 저장하기
    public void saveWord(Landknowledge landknowledge) {
        landknowledgeRepository.save(landknowledge);
    }
    // 상식 단어들 모두 가져오기
    public List<String> getWordList() {
        return landknowledgeRepository.getWordList();
    }

    // 특정 상식 단어의 세부내용 가져오기
    public Optional<Landknowledge> getLandknowledge(long id) {
        return landknowledgeRepository.findById(id);
    }
}
