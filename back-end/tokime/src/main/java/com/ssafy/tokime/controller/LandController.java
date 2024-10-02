package com.ssafy.tokime.controller;

import com.ssafy.tokime.model.Land;
import com.ssafy.tokime.model.Law;
import com.ssafy.tokime.service.LandService;
import com.ssafy.tokime.service.LawService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<List<Land>> getAllLands(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Land> landsPage = landService.getAllLands(pageable);

        return ResponseEntity.ok(landsPage.getContent());
    }

    // 토지 검색 조회 district + address 필요

    @GetMapping("/search")
    public ResponseEntity<List<Land>> searchLands(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String address) {

        List<Land> lands;

        // 입력값 검토 및 조건에 따라 검색 수행
        if (district == null && address == null) {
            return ResponseEntity.badRequest().body(null); // 아무것도 입력하지 않았을 때
        } else if (district != null && !district.trim().isEmpty() && (address == null || address.trim().isEmpty())) {
            // 2. district만 입력했을 때
            lands = landService.searchByDistrict(district.trim());
        } else if (address != null && !address.trim().isEmpty() && (district == null || district.trim().isEmpty())) {
            // 3. address만 입력했을 때
            lands = landService.searchByAddress(address.trim());
        } else {
            // 4. 둘 다 입력했을 때
            lands = landService.searchLands(district.trim(), address.trim());
        }

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
