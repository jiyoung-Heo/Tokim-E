package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.LandtermDTO;
import com.ssafy.tokime.model.Landterm;
import com.ssafy.tokime.model.Likeword;
import com.ssafy.tokime.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/term")
public class WordController {
    @Autowired
    private WordService wordService;

    static List<Landterm> landterms = new ArrayList<>();

    // 모든 단어를 가져오는 메서드
    // 전부 단어값만 가져옴
    // 검색기능이 있을 경우 해당 단어를 포함하는 값으로 가져옴
    @GetMapping("")
    public ResponseEntity<?> getWords(@RequestParam("keyword") String keyword) {
        List<LandtermDTO> words = new ArrayList<>();
        List<Landterm> result;
        System.out.println("keyword: " + keyword);
        System.out.println(keyword.length());
        if (keyword.length() == 0) {
            // 없으면 전부 가져오면 됨
            result = wordService.getWordList();
        } else {
            // 키워드 검색 부분에 해당하는 부분만 가져옴
            result = wordService.getSearchWordList(keyword);
            if (result.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
        }
        // Entity -> DTO 변환
        for (Landterm word : result) {
            words.add(new LandtermDTO(word));
        }
        return ResponseEntity.ok().body(words);
    }

    // 특정 단어의 상세 내용을 가져오는 메서드
    // Entity -> DTO 변환작업 필요함
    @GetMapping("/{wordId}")
    public ResponseEntity<?> getWord(@PathVariable long wordId) {
        Optional<Landterm> word = wordService.getWord(wordId);
        if (word.isPresent()) {
            LandtermDTO result = new LandtermDTO(word.get());
            return ResponseEntity.ok().body(result);
        } else { // 관련 내용이 없음 -> 그럴 일은 없지만 정확한 처리를 위해
            return ResponseEntity.notFound().build();
        }
    }

    // 즐겨찾기 조회 메서드
    @GetMapping("/like")
    public ResponseEntity<?> getWordLike() {

        // 추후 JWT을 디코딩해서 유저 id를 가져올 예정
        long userId = 1; // 여기를 JWT에서 가져옴, 추후 static 으로 뺄 예정

        List<Likeword> words = wordService.getLikeWordList(userId);
        if (words.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            // 여기까지 오면 즐겨찾기한 단어들의 id만 갖고있는 상태
            // 이걸로 모든 단어들을 다시 가져와야함
            List<LandtermDTO> result = new ArrayList<>();
            for (Likeword word : words) {
                Optional<Landterm> landterm = wordService.getWord(word.getTermId());
                LandtermDTO temp = new LandtermDTO(landterm.get());
                result.add(temp);
            }
            return ResponseEntity.ok().body(result);
        }
    }

    // 즐겨찾기 용어를 등록하는 메서드
    // 우선 해당 사용자의 즐겨찾기 목록이 있는지 확인, 없으면 일단 테이블 생성
    // 테이블 조회 후 해당 문자열 값에 삽입
    @PostMapping("/like/{wordId}")
    public ResponseEntity<?> likeWord(@PathVariable long wordId) {
        // 추후 JWT을 디코딩해서 유저 id를 가져올 예정
        long userId = 1; // 여기를 JWT에서 가져옴, 추후 static 으로 뺄 예정

        // 즐겨찾기의 PK는 유저의 ID
        Likeword word = new Likeword();
        word.setTermId(wordId);
        word.setUserId(userId);

        wordService.saveLikeWord(word);
        return ResponseEntity.ok().build();
    }

    // 즐겨찾기 해제 메서드
    @DeleteMapping("/like/{likeWordId}")
    public ResponseEntity<?> deleteWord(@PathVariable long likeWordId) {
        wordService.deleteLikeWord(likeWordId);
        return ResponseEntity.ok().build();
    }








}
