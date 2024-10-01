package com.ssafy.tokime.service;

import com.ssafy.tokime.dto.InvestmentPlannedLandDTO;
import com.ssafy.tokime.model.InvestmentPlannedLand;
import com.ssafy.tokime.model.User;
import com.ssafy.tokime.repository.InvestmentPlannedLandRepository;
import com.ssafy.tokime.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvestmentPlannedLandService {
    private final InvestmentPlannedLandRepository investmentPlannedLandRepository;
    private final UserRepository userRepository;

    public List<InvestmentPlannedLandDTO> getInvestmentPlannedLandsByUserEmail(String email){
        User user = userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("email로 조회 했으나 존재 하지 않는 유저"));
                List<InvestmentPlannedLand> lands = investmentPlannedLandRepository.findByUser(user);

                return lands.stream()
                        .map(InvestmentPlannedLand::toDTO)
                        .collect(Collectors.toList());

    }
}
