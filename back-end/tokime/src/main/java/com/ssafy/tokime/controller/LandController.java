package com.ssafy.tokime.controller;

import com.ssafy.tokime.model.Land;
import com.ssafy.tokime.model.Law;
import com.ssafy.tokime.service.LandService;
import com.ssafy.tokime.service.LawService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/land")
@RequiredArgsConstructor
public class LandController {
    private final LandService landService;

    private final LawService lawService;

    // 토지 전체조회
    @GetMapping
    public List<Land> getAllLands() {

        return landService.getAllLands();
    }

    // 토지 검색 조회 district + address 필요
    // 경우의 수
    // ex)충청북도 괴산군 감물면 광전리
    // 1. 아무것도 입력 안했을때
    // 2. district 만 입력
    // 2-1. district를 얼마나 상세히 입력하나
    // 3. address 만 입력
    // 4. 둘다 입력
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
