package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.InvestmentPlannedLandDTO;
import com.ssafy.tokime.model.InvestmentPlannedLand;
import com.ssafy.tokime.service.InvestmentPlannedLandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/land/invest")
@RequiredArgsConstructor
public class InvestmentPlannedLandController {

    private final InvestmentPlannedLandService investmentPlannedLandService;

    // 투자 예정지 등록
    @PostMapping
    public ResponseEntity<?> registerInvestmentPlannedLand(@RequestBody InvestmentPlannedLandDTO dto) {
        String email = getAuth();
        int result = investmentPlannedLandService.registInvestmentPlannedLand(dto, email);
        if (result==0) {
            return new ResponseEntity<>("성공적으로 등록 되었습니다.", HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>("실패하였습니다", HttpStatus.BAD_REQUEST);
        }

    }

    // 전체 조회
    @GetMapping
    public List<InvestmentPlannedLandDTO> getInvestmentPlannedLands(){
        String email = getAuth();
        return investmentPlannedLandService.getInvestmentPlannedLandsByUserEmail(email);
    }



    private String getAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return authentication.getName(); // 이메일 반환
        }
        throw new RuntimeException("인가되지 않은 접근");
    }

}
