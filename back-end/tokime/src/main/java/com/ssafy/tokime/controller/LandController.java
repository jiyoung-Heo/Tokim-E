package com.ssafy.tokime.controller;

import com.ssafy.tokime.model.Land;
import com.ssafy.tokime.service.LandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/land")
public class LandController {
    @Autowired
    private LandService landService;

    // 토지 전체조회
    @GetMapping
    public List<Land> getAllLands() {
        return landService.getAllLands();
    }

    // 토지 검색 조회 동 + 지번 필요
    // 동은 like로 address는 정확한값
    @GetMapping("/search")
    public ResponseEntity<List<Land>> searchLands(
            @RequestParam String district,
            @RequestParam String address) {
        List<Land> lands = landService.searchLands(district, address);
        return ResponseEntity.ok(lands);
    }


}
