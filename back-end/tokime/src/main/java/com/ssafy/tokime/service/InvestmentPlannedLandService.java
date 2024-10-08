package com.ssafy.tokime.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.tokime.dto.ChecklistDTO;
import com.ssafy.tokime.dto.InvestmentPlannedLandDTO;
import com.ssafy.tokime.dto.LandFilterDTO;
import com.ssafy.tokime.model.*;
import com.ssafy.tokime.repository.ChecklistRepository;
import com.ssafy.tokime.repository.ChecklistStatusRepository;
import com.ssafy.tokime.repository.InvestmentPlannedLandRepository;
import com.ssafy.tokime.repository.UserRepository;
import jakarta.transaction.Transactional;
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
    private final JPAQueryFactory queryFactory;

    // 투자 예정지 등록
    public void registInvestmentPlannedLand(InvestmentPlannedLandDTO dto, String email) {
        // 로그인 유저
        User user = userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new RuntimeException("email로 조회 했으나 존재 하지 않는 유저"));

            // 투자예정지 등록정보 entity로 변환
            InvestmentPlannedLand investmentPlannedLand = dto.toEntity(user);
            // 투자 예정지 저장
            investmentPlannedLand = investmentPlannedLandRepository.save(investmentPlannedLand);

            // 체크리스트 상태 저장
            saveChecklists(dto.getChecklistIds(), investmentPlannedLand); // 체크리스트 ID로 수정

    }

    // 첫 체크리스트 실행 시 가져오기
    public List<ChecklistDTO> getallchecklist(){
        List<Checklist> checklist =checklistRepository.findAll();
        return checklist.stream()
                .map(Checklist::toDto)
                .collect(Collectors.toList());
    }

    // checklist 저장하는것
    public void saveChecklists(List<Integer> checklistIds , InvestmentPlannedLand investmentPlannedLand) {
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

    public List<ChecklistDTO> getChecklistWithStatus(Long investmentPlannedLandId) {
        // 투자 예정지 찾기
        InvestmentPlannedLand investmentPlannedLand = investmentPlannedLandRepository.findById(investmentPlannedLandId)
                .orElseThrow(() -> new RuntimeException("투자 예정지를 찾을 수 없습니다."));

        // 해당 투자 예정지에 대한 체크리스트 상태를 가져옴
        List<ChecklistStatus> checklistStatuses = statusRepository.findByInvestmentPlannedLand(investmentPlannedLand);

        // 체크리스트 상태에서 체크리스트 ID를 기반으로 체크리스트 DTO 리스트 생성
        return checklistStatuses.stream()
                .map(status -> {
                    Checklist checklist = status.getChecklist(); // 체크리스트 상태에서 체크리스트 가져오기
                    return ChecklistDTO.builder()
                            .checklistId(checklist.getChecklistId()) // 체크리스트 ID
                            .content(checklist.getContent()) // 체크리스트 내용
                            .build();
                })
                .collect(Collectors.toList());
    }



    // 투자 예정지 수정
    @Transactional
    public InvestmentPlannedLandDTO updateInvestmentPlannedLand(Long id, InvestmentPlannedLandDTO dto, String email) {
        if (dto == null) {
            throw new IllegalArgumentException("수정할 데이터가 필요합니다.");
        }

        InvestmentPlannedLand investmentPlannedLand = investmentPlannedLandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("투자 예정지를 찾을 수 없습니다."));

        User user = userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다."));

        if (!investmentPlannedLand.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("수정할 권한이 없습니다.");
        }

        // DTO의 내용을 엔티티에 업데이트
        investmentPlannedLand.updateFromDto(dto);
        // 수정된 투자 예정지 저장
        investmentPlannedLandRepository.save(investmentPlannedLand);

        return investmentPlannedLand.toDTO();
    }


    // 전체 조회
    public List<InvestmentPlannedLandDTO> getInvestmentPlannedLandsByUserEmail(String email){
        User user = userRepository.findByEmailAndIsDeletedFalse(email).orElseThrow(()->
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

        User user = userRepository.findByEmailAndIsDeletedFalse(email).orElseThrow(()->new RuntimeException("email로 조회 했으나 존재 하지 않는 유저"));

        if(user.getUserId()!=investmentPlannedLand.getUser().getUserId()){
            throw new RuntimeException("접근 권한이 없습니다");
        }



        return investmentPlannedLand.toDTO(); //dto변환

    }


    // 삭제
    @Transactional
    public void deleteinvestmentPlannedLand(Long id,String email){
        InvestmentPlannedLand investmentPlannedLand = investmentPlannedLandRepository.findById(id)
                .orElseThrow(()->new RuntimeException("투자예정지를 찾을 수 없습니다"));
        User user = userRepository.findByEmailAndIsDeletedFalse(email).orElseThrow(()->new RuntimeException("존재하지않는 유저입니다"));
        if(user.getUserId()!=investmentPlannedLand.getUser().getUserId()){
            throw new RuntimeException("삭제할 권한이 없습니다.");
        }
        // 체크리스트 삭제
        statusRepository.deleteByInvestmentPlannedLand(investmentPlannedLand);
        // 투자예정지 삭제
        investmentPlannedLandRepository.delete(investmentPlannedLand);

    }

    //필터 조회
    public List<InvestmentPlannedLandDTO> filterInvestmentPlannedLands(LandFilterDTO dto, String email) {
        User user = userRepository.findByEmailAndIsDeletedFalse(email).orElseThrow(()->new RuntimeException("존재 하지 않는 유저입니다"));

        // Q타입 생성
        QInvestmentPlannedLand investmentPlannedLand = QInvestmentPlannedLand.investmentPlannedLand;
        // 유저 필터링
        BooleanExpression predicate = investmentPlannedLand.user.eq(user);

        // 지역을 선택 했을 경우
        if (dto.getLandAddress() != null && !dto.getLandAddress().isEmpty()) {
            predicate = predicate.and(investmentPlannedLand.landAddress.contains(dto.getLandAddress()));
        }
        // 별칭에 값을 넣었을 경우
        if (dto.getLandNickname() != null && !dto.getLandNickname().isEmpty()) {
            predicate = predicate.and(investmentPlannedLand.landNickname.contains(dto.getLandNickname()));
        }
        List<InvestmentPlannedLand> lands = queryFactory.selectFrom(investmentPlannedLand)
                .where(predicate)
                .fetch();

        return lands.stream()
                .map(InvestmentPlannedLand::toDTO)
                .toList();
    }




}
