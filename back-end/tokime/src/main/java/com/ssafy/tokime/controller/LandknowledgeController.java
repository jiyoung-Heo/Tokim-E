package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.LandknowledgeDTO;
import com.ssafy.tokime.model.Landknowledge;
import com.ssafy.tokime.model.Likeword;
import com.ssafy.tokime.service.LandknowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
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

    // 즐겨찾기 조회 메서드
    @GetMapping("/like")
    public ResponseEntity<?> getWordLike() {

        // 추후 JWT을 디코딩해서 유저 id를 가져올 예정
        long userId = 1; // 여기를 JWT에서 가져옴, 추후 static 으로 뺄 예정

        Optional<Likeword> words = landknowledgeService.getLikeWord(userId);
        if (! words.isPresent()) {

            // 없으면 테이블만 생성해줌
            makdLikeTable(userId);

            return ResponseEntity.notFound().build();
        } else {
            if (words.get().getWordList().length() != 0) {
                // 즐겨찾기한 목록들이 있음
                // "1,2,3,4,5"의 상태로 있으니 이걸 [1,2,3,4,5]로 만들어주고
                // 이후 해당 id값에 해당하는 용어들만 반환
                List<LandknowledgeDTO> result = likeList(words);
                return ResponseEntity.ok().body(result);
            } else { // "" 인 경우 처리 필요
                return ResponseEntity.noContent().build();
            }

        }
    }

    // 즐겨찾기 용어를 등록하는 메서드
    // 우선 해당 사용자의 즐겨찾기 목록이 있는지 확인, 없으면 일단 테이블 생성
    // 테이블 조회 후 해당 문자열 값에 삽입
    @PostMapping("/{wordId}")
    public ResponseEntity<?> likeWord(@PathVariable long wordId) {
        // 해당 id를 갖고 있는 용어를 추가하려는 상황
        // 추가를 위해서 일단 목록들을 가져오고, 그 목록들에서 삽입 후 갱신
        // 우선 목록들 가져옴

        // 추후 JWT을 디코딩해서 유저 id를 가져올 예정
        long userId = 1; // 여기를 JWT에서 가져옴, 추후 static 으로 뺄 예정
        Optional<Likeword> likeWord = landknowledgeService.getLikeWord(userId);
        StringBuilder sb = new StringBuilder();
        if (! likeWord.isPresent()) { // 혹시나 모르니 예외 처리
            // 즐겨찾기 테이블이 없다면 그냥 생성해줌
            makdLikeTable(userId);
            return ResponseEntity.notFound().build();
        } else {
            // 즐겨찾기 테이블의 문자열 상태에서 추가해줌
            sb.append(likeWord.get().getWordList());

            // "1,2,3,4" -> [1,2,3,4]
            String[] tempList = likeWord.get().getWordList().split(",");
            int[] wordIdList = new int[tempList.length];
            for (int i = 0; i < tempList.length; i++) {
                wordIdList[i] = Integer.parseInt(tempList[i]);
            }
            // 삽입하기 적절한 위치
            // [1,2,4,5] 인 상태에서 3을 삽입한다고 하면 1을 반환
            // 1 앞뒤로 새로운 배열에 적재하고, 1다음자리에 삽입id넣고 그 뒤 남은 값까지 적재
            int location = searchInsertLocation((int) wordId,wordIdList);
            if (location == -1) { // 즐겨찾기하려는 용어의 id가 제일 작은 값을 지닐 경우 뒤에만 ,
                sb.insert(0,wordId+",");
            } else if (location == tempList.length-1) { // 맨 뒤에 삽입, 앞에만 ,
                sb.insert(location,","+wordId);
            } else { // 중간에 삽입, 앞뒤로 ,삽입
                sb.insert(location,","+wordId+",");
            }
            // 넣었으니 이제 즐겨찾기 테이블 갱신
            likeWord.get().setWordList(sb.toString());
            landknowledgeService.updateLikeWord(likeWord.get());

            return ResponseEntity.ok().build();
        }
    }

    // 즐겨찾기 해제 메서드
    // 작성 예정중

    // 즐겨찾기 테이블 생성 메서드
    public void makdLikeTable (long userId) {
        Likeword likeWord = new Likeword();
        likeWord.setLikewordId(userId);
        likeWord.setWordList("");
        landknowledgeService.updateLikeWord(likeWord);
    }

    // 즐겨찾기 테이블에서 문자열로 돼 있는 즐겨찾기 목록을 상식테이블 정보로 변환
    public List<LandknowledgeDTO> likeList(Optional<Likeword> likeWord) {
        List<LandknowledgeDTO> result = new ArrayList<>();
        String[] likeWordList = likeWord.get().getWordList().split(",");
        for (String wordId : likeWordList) {
            Optional<Landknowledge> temp = landknowledgeService.getLandknowledge(Long.parseLong(wordId));
            if (temp.isPresent()) { // 당연히 들어있겠지만 더 정확한 처리를 위해
                LandknowledgeDTO landknowledgeDTO = new LandknowledgeDTO(temp.get());
                result.add(landknowledgeDTO);
            }
        }
        return result;
    }

    // 즐겨찾기 목록들 중 삽입하기 적절한 위치를 찾기
    // return 값 바로 뒤에 삽입하면 됨
    public static int searchInsertLocation(int num, int[] list) {
        int start = 0;
        int end = list.length-1;
        while (start <= end) {
            int index = (start+end)/2;
            int mid = list[index];
            if (mid > num) {
                end = index-1;
            } else {
                start = index+1;
            }
        }
        return end;
    }


    // 즐겨찾기 목록들 중 삭제값 찾기
}
