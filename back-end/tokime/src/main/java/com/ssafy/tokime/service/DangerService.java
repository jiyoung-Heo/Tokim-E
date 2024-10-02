package com.ssafy.tokime.service;

import com.ssafy.tokime.model.Danger;
import com.ssafy.tokime.repository.DangerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DangerService {

    @Autowired
    private DangerRepository dangerRepository;

    // 특정 토지의 신고글 모두 조회
    public List<Danger> dangerList(String landId) {
        return dangerRepository.findAllByLandId(landId);
    }

    // 특정 토지의 신고글 상세 조회
    public Optional<Danger> findDanger(Long dangerId) {
        return dangerRepository.findById(dangerId);
    }

    // 신고 생성
    public void addDanger(Danger danger) {
        dangerRepository.save(danger);
    }

    // 특정 토지의 신고글 수정

    // 특정 토지의 신고글 삭제

}
