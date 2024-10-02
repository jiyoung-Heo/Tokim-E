package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.ChecklistDTO;
import com.ssafy.tokime.dto.ChecklistStatusDTO;
import com.ssafy.tokime.dto.InvestmentPlannedLandDTO;
import com.ssafy.tokime.model.ChecklistStatus;
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
        try {
           investmentPlannedLandService.registInvestmentPlannedLand(dto, email);
            return new ResponseEntity<>("성공적으로 등록 되었습니다.", HttpStatus.CREATED);
        }   catch (Exception e) {
            return new ResponseEntity<>("서버 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 전체 조회
    @GetMapping
    public List<InvestmentPlannedLandDTO> getInvestmentPlannedLands(){
        String email = getAuth();
        return investmentPlannedLandService.getInvestmentPlannedLandsByUserEmail(email);
    }

    // 체크리스트 처음 불러오기
    @GetMapping("/checklist")
    public List<ChecklistDTO> getchecklist(){
            return investmentPlannedLandService.getallchecklist();
    }

    // 상세 조회
    @GetMapping("/{investmentPlannedLandId}")
    public ResponseEntity<InvestmentPlannedLandDTO> getInvestmentDetail(@PathVariable Long investmentPlannedLandId){
        String email = getAuth();
        try {
            InvestmentPlannedLandDTO dto = investmentPlannedLandService.investmentPlannedLandDetail(investmentPlannedLandId,email);

            return ResponseEntity.ok(dto); // 성공적으로 조회된 DTO 반환
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // 오류 발생 시 null 반환
        }
    }

    // 수정
    @PutMapping("/{investmentPlannedLandId}")
    public ResponseEntity<InvestmentPlannedLandDTO> updateInvestment(@PathVariable Long investmentPlannedLandId, @RequestBody InvestmentPlannedLandDTO dto) {
        String email = getAuth(); // 인증된 사용자의 이메일 가져오기
        InvestmentPlannedLandDTO updatedLand = investmentPlannedLandService.updateInvestmentPlannedLand(investmentPlannedLandId, dto, email);
        return ResponseEntity.ok(updatedLand); // 수정된 투자 예정지 DTO 반환
    }

    // 삭제
    @DeleteMapping("/{investmentPlannedLandId}")
    public ResponseEntity<?> deleteInvestment(@PathVariable Long investmentPlannedLandId){
        String email = getAuth();
            investmentPlannedLandService.deleteinvestmentPlannedLand(investmentPlannedLandId,email);
            return new ResponseEntity<>("삭제에 성공했습니다",HttpStatus.OK);

    }
    // 체크된 체크리스트 불러오기
    @GetMapping("/checked/{investmentPlannedLandId}")
    public List<ChecklistDTO> getCheckedChecklist(@PathVariable Long investmentPlannedLandId) {
        return investmentPlannedLandService.getChecklistWithStatus(investmentPlannedLandId);
    }


    private String getAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return authentication.getName(); // 이메일 반환
        }
        throw new RuntimeException("인가되지 않은 접근");
    }

}
