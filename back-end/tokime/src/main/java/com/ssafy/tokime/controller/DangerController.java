package com.ssafy.tokime.controller;


import com.ssafy.tokime.dto.DangerListDTO;
import com.ssafy.tokime.model.Danger;
import com.ssafy.tokime.service.DangerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/danger")
public class DangerController {
    @Autowired
    private DangerService dangerService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // 줌인 해서 특정 토지의 신고글 목록 조회 - 제목과 신고글 id만 제공
    @GetMapping("")
    public ResponseEntity<?> getDanger(@RequestParam(name="lat") Double lat, @RequestParam(name="lng") Double lng) {
        List<Danger> dangers = dangerService.dangerList(lat, lng);
        logger.info("가져온 값들은? "+dangers.size());
        List<DangerListDTO> list = new ArrayList<>();
        for (Danger danger : dangers) {
            list.add(new DangerListDTO(danger));
        }
        if (list.size() > 0) { // 신고글이 한 개 이상 있음
            return ResponseEntity.ok().body(list);
        } else { // 신고글이 하나도 없음
            return ResponseEntity.ok().body("신고 정보가 없습니다.");
        }

    }

    // 신고글 상세 조회
    @GetMapping("/{dangerId}")
    public ResponseEntity<?> DangerDetail(@PathVariable(name="dangerId") Long dangerId) {
        Optional<Danger> danger = dangerService.findDanger(dangerId);
        if (danger.isPresent()) {
            return ResponseEntity.ok().body(danger.get());
        }
        return ResponseEntity.notFound().build();
    }

    // 신고글 작성
    @PostMapping("")
    public ResponseEntity<?> addDanger(@RequestBody Danger danger) {
        dangerService.addDanger(danger);
        return ResponseEntity.ok().build();
    }

    // 신고글 수정

    // 신고글 삭제


}
