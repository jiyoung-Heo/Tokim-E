package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.ChecklistDTO;
import com.ssafy.tokime.dto.ChecklistStatusDTO;
import com.ssafy.tokime.dto.InvestmentPlannedLandDTO;
import com.ssafy.tokime.model.ChecklistStatus;
import com.ssafy.tokime.model.InvestmentPlannedLand;
import com.ssafy.tokime.service.InvestmentPlannedLandService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
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
        }  catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("데이터베이스 오류 발생: " + e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("서버에서 오류 발생: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 전체 조회
    @GetMapping
    public ResponseEntity<?> getInvestmentPlannedLands() {
        String email = getAuth();
        try {
            List<InvestmentPlannedLandDTO> lands = investmentPlannedLandService.getInvestmentPlannedLandsByUserEmail(email);
            return new ResponseEntity<>(lands, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("서버 오류가 발생했습니다: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 체크리스트 처음 불러오기
    @GetMapping("/checklist")
    public ResponseEntity<?> getChecklist() {
        try {
            List<ChecklistDTO> checklist = investmentPlannedLandService.getallchecklist();

            // 체크리스트가 비어 있을 경우
            if (checklist.isEmpty()) {
                return new ResponseEntity<>("체크리스트 항목이 없습니다.", HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(checklist, HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>("데이터베이스 오류가 발생했습니다: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("서버 오류가 발생했습니다: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세 조회
    @GetMapping("/{investmentPlannedLandId}")
    public ResponseEntity<?> getInvestmentDetail(@PathVariable Long investmentPlannedLandId) {
        String email = getAuth();
        try {
            InvestmentPlannedLandDTO dto = investmentPlannedLandService.investmentPlannedLandDetail(investmentPlannedLandId, email);
            return ResponseEntity.ok(dto); // 성공적으로 조회된 DTO 반환
        }  catch (RuntimeException e) {
            return new ResponseEntity<>("서버 오류가 발생했습니다: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 수정
    @PutMapping("/{investmentPlannedLandId}")
    public ResponseEntity<?> updateInvestment(@PathVariable Long investmentPlannedLandId, @RequestBody InvestmentPlannedLandDTO dto) {
        String email = getAuth(); // 인증된 사용자의 이메일 가져오기
        try {
            InvestmentPlannedLandDTO updatedLand = investmentPlannedLandService.updateInvestmentPlannedLand(investmentPlannedLandId, dto, email);
            return ResponseEntity.ok(updatedLand); // 수정된 투자 예정지 DTO 반환
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("유효하지 않은 데이터입니다: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("서버 오류가 발생했습니다: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 삭제
    @DeleteMapping("/{investmentPlannedLandId}")
    public ResponseEntity<?> deleteInvestment(@PathVariable Long investmentPlannedLandId){
        String email = getAuth();
        try{
            investmentPlannedLandService.deleteinvestmentPlannedLand(investmentPlannedLandId,email);
            return new ResponseEntity<>("삭제에 성공했습니다",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("서버 오류가 발생했습니다"+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 체크된 체크리스트 불러오기
    @GetMapping("/checked/{investmentPlannedLandId}")
    public ResponseEntity<?> getCheckedChecklist(@PathVariable Long investmentPlannedLandId) {
        try {
            List<ChecklistDTO> checkedChecklist = investmentPlannedLandService.getChecklistWithStatus(investmentPlannedLandId);

            // 체크된 체크리스트가 비어 있을 경우
            if (checkedChecklist.isEmpty()) {
                return new ResponseEntity<>("체크된 체크리스트 항목이 없습니다.", HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(checkedChecklist, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("서버 오류가 발생했습니다: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    private String getAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return authentication.getName(); // 이메일 반환
        }
        throw new RuntimeException("인가되지 않은 접근");
    }

}
