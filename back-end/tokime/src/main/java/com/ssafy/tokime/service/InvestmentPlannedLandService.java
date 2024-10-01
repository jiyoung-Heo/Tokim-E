package com.ssafy.tokime.service;

import com.ssafy.tokime.dto.ChecklistDTO;
import com.ssafy.tokime.dto.InvestmentPlannedLandDTO;
import com.ssafy.tokime.model.Checklist;
import com.ssafy.tokime.model.ChecklistStatus;
import com.ssafy.tokime.model.InvestmentPlannedLand;
import com.ssafy.tokime.model.User;
import com.ssafy.tokime.repository.ChecklistRepository;
import com.ssafy.tokime.repository.ChecklistStatusRepository;
import com.ssafy.tokime.repository.InvestmentPlannedLandRepository;
import com.ssafy.tokime.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvestmentPlannedLandService {
    private final InvestmentPlannedLandRepository investmentPlannedLandRepository;
    private final UserRepository userRepository;
    private final ChecklistRepository checklistRepository;
    private final ChecklistStatusRepository statusRepository;

    // 투자 예정지 등록
    public int registInvestmentPlannedLand(InvestmentPlannedLandDTO dto, String email) {
        // 로그인 유저
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("email로 조회 했으나 존재 하지 않는 유저"));

        try {
            // 투자예정지 등록정보 entity로 변환
            InvestmentPlannedLand investmentPlannedLand = InvestmentPlannedLand.builder()
                    .user(user)
                    .landAddress(dto.getLandAddress())
                    .landGradient(dto.getLandGradient())
                    .landPrice(dto.getLandPrice())
                    .landRoad(dto.getLandRoad())
                    .landOwner(dto.getLandOwner())
                    .landUseStatus(dto.getLandUseStatus())
                    .landCreatedAt(new Date()) // 현재 시간으로 설정
                    .landUpdatedAt(new Date()) // 현재 시간으로 설정
                    .landStory(dto.getLandStory())
                    .plannedLandPyeong(dto.getPlannedLandPyeong())
                    .plannedLandPrice(dto.getPlannedLandPrice())
                    .checkedCount(dto.getCheckedCount()) // 초기값 설정
                    .build();

            // 투자 예정지 저장
            investmentPlannedLand = investmentPlannedLandRepository.save(investmentPlannedLand);

            // 체크리스트 상태 저장
            saveChecklists(dto.getChecklistIds(), investmentPlannedLand); // 체크리스트 ID로 수정

            return 0; // 성공
        } catch (Exception e) {
            return 1; // 실패
        }
    }
    // 체크리스트 체크한거 리스트 불러오는거
    public List<ChecklistStatus> getChecklistStatuses(Long investmentPlannedLandId) {
        InvestmentPlannedLand investmentPlannedLand = investmentPlannedLandRepository.findById(investmentPlannedLandId)
                .orElseThrow(() -> new RuntimeException("투자 예정지를 찾을 수 없습니다."));
        return statusRepository.findByInvestmentPlannedLand(investmentPlannedLand);
    }

    // checklist 저장하는것
    private void saveChecklists(List<Integer> checklistIds , InvestmentPlannedLand investmentPlannedLand) {
        for (Integer checklistId : checklistIds) {

            Checklist checklist = checklistRepository.findById(checklistId)
                    .orElseThrow(() -> new RuntimeException("체크리스트 항목을 찾을 수 없습니다."));


            ChecklistStatus status = ChecklistStatus.builder()
                    .investmentPlannedLand(investmentPlannedLand)
                    .checklist(checklist)
                    .build();

            statusRepository.save(status);
        }
    }

    // 전체 조회
    public List<InvestmentPlannedLandDTO> getInvestmentPlannedLandsByUserEmail(String email){
        User user = userRepository.findByEmail(email).orElseThrow(()->
                new RuntimeException("email로 조회 했으나 존재 하지 않는 유저"));
                List<InvestmentPlannedLand> lands = investmentPlannedLandRepository.findByUser(user);

                return lands.stream()
                        .map(InvestmentPlannedLand::toDTO)
                        .collect(Collectors.toList());

    }

    //상세 조회
    public InvestmentPlannedLandDTO investmentPlannedLandDetail(Long id, String email){
        //id 는 투자예쩡지 id고 email은 현재로그인 유저 email
        //email 에서 로그인 userId 추출해서 투자예정지 에있는 userId랑 같은지 확인작업거쳐야함
        InvestmentPlannedLand investmentPlannedLand = investmentPlannedLandRepository.findById(id)
                .orElseThrow(()->new RuntimeException("투자예정지를 찾을 수 없습니다."));

        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("email로 조회 했으나 존재 하지 않는 유저"));

        if(user.getUserId()!=investmentPlannedLand.getUser().getUserId()){
            throw new RuntimeException("접근 권한이 없습니다");
        }

        return investmentPlannedLand.toDTO(); //dto변환

    }


}
