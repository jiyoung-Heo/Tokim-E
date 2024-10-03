package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.LandtermDTO;
import com.ssafy.tokime.model.Landterm;
import com.ssafy.tokime.model.Likeword;
import com.ssafy.tokime.model.User;
import com.ssafy.tokime.service.UserService;
import com.ssafy.tokime.service.WordService;
import com.ssafy.tokime.service.facade.UserFacadeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/term")
public class WordController {
    @Autowired
    private WordService wordService;
    private long userId;
    private static final Logger logger = LoggerFactory.getLogger(WordController.class);

    //사용자의 정보 가져오기
    @Autowired
    private UserFacadeService userService;
    private static User user;


    // 모든 단어를 가져오는 메서드
    // 전부 단어값만 가져옴
    // 검색기능이 있을 경우 해당 단어를 포함하는 값으로 가져옴
    @GetMapping("")
    public ResponseEntity<?> getWords(@RequestParam("keyword") String keyword) {
        List<LandtermDTO> words = new ArrayList<>();
        List<Landterm> result;
        System.out.println("keyword: " + keyword);
        System.out.println(keyword.length());
        logger.info("들어온 값 keyword: " + keyword+" 값의 길이 : "+keyword.length());

        // 예외처리를 위한 구문
        if (keyword.contains(",")) {
            keyword = keyword.split(",")[0];
        }
        if (keyword.contains("\"\"")) {
            keyword = "";
        }

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
        if (SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
            return ResponseEntity.ok().body(words);
        } else {
            try {
                
                List<Likeword> asdf = wordService.getLikeWordList(getUserId());
                logger.info("가져온 즐찾 단어의 수  :"+asdf.size());
                for (int i = 0; i < asdf.size(); i++) {
                    logger.info(asdf.get(i).getTermId()+" "+asdf.get(i).getUserId());
                }
                // 가져온 것들이 즐겨찾기에 등록된 것들인지 표시정돈 해주기
                if (keyword.length() == 0) { // 전체 조회일시 바로 index값으로 접근하면됨
                    for (int i = 0; i < asdf.size(); i++) {
                        long index = asdf.get(i).getTermId()-1;
                        words.get((int) index).setLikeCheck(true);
                    }
                } else { // 특정 키워드로 검색해서 가져온 것들
                    // 키워드 목록과 즐찾목록 비교해서 일치하면 likecheck = ture로 바꿔주기
                    for (int x = 0; x < asdf.size(); x++) {
                        long number = asdf.get(x).getTermId();
                        for (int y = 0; y < words.size(); y++) {
                            if (number == words.get(y).getTermId()) {
                                // 즐찾 termId와 검색결과들의 termId 비교
                                words.get(y).setLikeCheck(true);
                                break;
                            }
                        }
                    }
                }
                return ResponseEntity.ok().body(words);
            }catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).build();
            }
        }
    }

    // 특정 단어의 상세 내용을 가져오는 메서드
    // Entity -> DTO 변환작업 필요함
    @GetMapping("/{wordId}")
    public ResponseEntity<?> getWord(@PathVariable("wordId") long wordId) {
        Optional<Landterm> word = wordService.getWord(wordId);
        if (word.isPresent()) {
            LandtermDTO result = new LandtermDTO(word.get());
            if (likeCheck(result.getTermId())) {
                result.setLikeCheck(true);
            }
            return ResponseEntity.ok().body(result);
        } else { // 관련 내용이 없음 -> 그럴 일은 없지만 정확한 처리를 위해
            return ResponseEntity.notFound().build();
        }
    }

    // 즐겨찾기 조회 메서드
    @GetMapping("/like")
    public ResponseEntity<?> getWordLike() {
        try {
            long userId = getUserId();

            List<Likeword> words = wordService.getLikeWordList(userId);
            logger.info("찾은 단어의 갯수 : "+words.size());
            List<LandtermDTO> result = new ArrayList<>();
            if (! words.isEmpty()) {
                // 여기까지 오면 즐겨찾기한 단어들의 id만 갖고있는 상태
                // 이걸로 모든 단어들을 다시 가져와야함
                for (Likeword word : words) {
                    Optional<Landterm> landterm = wordService.getWord(word.getTermId());
                    LandtermDTO temp = new LandtermDTO(landterm.get());
                    temp.setLikeCheck(true);
                    result.add(temp);
                }
            }
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e);
        }
    }

    // 즐겨찾기 용어를 등록하는 메서드
    // 우선 해당 사용자의 즐겨찾기 목록이 있는지 확인, 없으면 일단 테이블 생성
    // 테이블 조회 후 해당 문자열 값에 삽입
    @PostMapping("/like/{wordId}")
    public ResponseEntity<?> likeWord(@PathVariable long wordId) {
        // 추후 JWT을 디코딩해서 유저 id를 가져올 예정
        try {
            long userId = getUserId(); // 여기를 JWT에서 가져옴, 추후 static 으로 뺄 예정
            // 즐겨찾기의 PK는 유저의 ID
            Likeword word = new Likeword();
            word.setTermId(wordId);
            word.setUserId(userId);

            wordService.saveLikeWord(word);
            return ResponseEntity.ok().build();
        }catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
            return ResponseEntity.status(500).body(e);
        }
    }

    // 즐겨찾기 해제 메서드

    @DeleteMapping("/like/{termId}")
    public ResponseEntity<?> deleteWord(@PathVariable long termId) {
        try {
            long userId = getUserId();
            System.out.println("삭제하고자 하는 용어 : "+termId+" 맞나? :"+likeCheck(termId));
            wordService.deleteLikeWord(userId, termId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
            return ResponseEntity.status(500).body(e);
        }

    }

    // 즐겨찾기한 용어인지 확인하는 메서드
    public boolean likeCheck(long wordId) {
        try {
            List<LandtermDTO> asdf = (List<LandtermDTO>) getWordLike().getBody();
            for (LandtermDTO word : asdf) {
                if (word.getTermId() == wordId) {
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    // 유저 정보 가져오기
    public Long getUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        user = userService.getUserInfo(email);
        return user.getUserId();
    }
}
