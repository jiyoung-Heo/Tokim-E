package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.LandknowledgeDTO;
import com.ssafy.tokime.model.Landknowledge;
import com.ssafy.tokime.service.LandknowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/word")
public class LandknowledgeController {
    @Autowired
    private LandknowledgeService landknowledgeService;

    // 모든 단어를 가져오는 메서드
    @GetMapping("")
    public ResponseEntity<?> getWords() {
        List<String> words = landknowledgeService.getWordList();
        return ResponseEntity.ok().body(words);
    }

    // 특정 단어의 상세 내용을 가져오는 메서드
    // Entity -> DTO 변환작업 필요함
    @GetMapping("/{wordId}")
    public ResponseEntity<?> getWord(@PathVariable long wordId) {
        Optional<Landknowledge> word = landknowledgeService.getLandknowledge(wordId);
        System.out.println(word.get().getKnowledgeId());
        if (word.isPresent()) {
            LandknowledgeDTO result = new LandknowledgeDTO(word.get());
            return ResponseEntity.ok().body(result);
        } else { // 관련 내용이 없음 -> 그럴 일은 없지만 정확한 처리를 위해
            return ResponseEntity.notFound().build();
        }
    }
}
