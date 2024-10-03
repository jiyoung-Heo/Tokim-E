package com.ssafy.tokime.service;


import com.ssafy.tokime.model.Land;
import com.ssafy.tokime.repository.LandRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LandService {
    @Autowired
    LandRepository landRepository;

    public Page<Land> getAllLands(Pageable pageable) {
        return landRepository.findAll(pageable);
    }

    public List<Land> searchLands(String district, String address) {
        Pageable top5 = PageRequest.of(0, 5);  // 첫 페이지에서 5개의 항목만 가져오기
        return landRepository.findTop5ByDistrictAndAddress(district, address, top5);
    }

    public List<Land> searchByDistrict(String district) {
        Pageable top5 = PageRequest.of(0, 5);  // 첫 페이지에서 5개의 항목만 가져오기
        return landRepository.findTop5ByDistrict(district, top5);
    }

    public List<Land> searchByAddress(String address) {
        Pageable top5 = PageRequest.of(0, 5);  // 첫 페이지에서 5개의 항목만 가져오기
        return landRepository.findTop5ByAddress(address, top5);
    }

}
