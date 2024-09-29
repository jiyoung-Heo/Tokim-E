package com.ssafy.tokime.controller;

import com.ssafy.tokime.model.Land;
import com.ssafy.tokime.model.Law;
import com.ssafy.tokime.service.LandService;
import com.ssafy.tokime.service.LawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/land")
public class LandController {
    @Autowired
    private LandService landService;
    @Autowired
    private LawService lawService;

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

    // 특정지번조례조회
    @GetMapping("/bylaw/{landDistrictCode}")
    public List<Law> getLaw(@PathVariable Long landDistrictCode){
        String districtCodeStr = String.valueOf(landDistrictCode);
        if (districtCodeStr.length() > 5) {
            districtCodeStr = districtCodeStr.substring(0, 5);
        }
        Long lawDistrict = Long.valueOf(districtCodeStr);
        System.out.println(lawDistrict);
        return lawService.selectAllLawByDistrict(lawDistrict);
    }


}
