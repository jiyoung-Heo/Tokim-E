package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.InvestmentPlannedLandDTO;
import com.ssafy.tokime.service.InvestmentPlannedLandService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/land/invest")
@RequiredArgsConstructor
public class InvestmentPlannedLandController {

    private final InvestmentPlannedLandService investmentPlannedLandService;

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
