package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.DangerDetailDTO;
import com.ssafy.tokime.dto.DangerListDTO;
import com.ssafy.tokime.model.Danger;
import com.ssafy.tokime.service.DangerService;
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

    // 줌인 해서 특정 토지의 신고글 목록 조회 - 제목과 신고글 id만 제공
    @GetMapping("")
    public ResponseEntity<?> getDanger(@RequestParam String landId) {
        List<Danger> dangers = dangerService.dangerList(landId);
        List<DangerListDTO> list;
        if (dangers.size() == 0) {
            return ResponseEntity.noContent().build();
        } else {
            list = new ArrayList<>();
            for (Danger danger : dangers) {
                list.add(new DangerListDTO(danger));
            }
        }
        return ResponseEntity.ok().body(list);
    }

    // 신고글 상세 조회
    @GetMapping("/{dangerId}")
    public ResponseEntity<?> DangerDetail(@PathVariable Long dangerId) {
        Optional<Danger> danger = dangerService.findDanger(dangerId);
        if (danger.isPresent()) {
            DangerDetailDTO detail = new DangerDetailDTO(danger.get());
            return ResponseEntity.ok().body(detail);
        }
        return ResponseEntity.notFound().build();
    }

    // 신고글 작성
//    @PostMapping("")
//    public ResponseEntity<?> addDanger(@RequestBody DangerDetailDTO dangerDetail) {
//
//    }

    // 신고글 수정

    // 신고글 삭제


}
