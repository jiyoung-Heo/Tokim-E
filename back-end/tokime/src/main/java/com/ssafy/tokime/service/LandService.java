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

    public List<Land> searchLands(String district, String address,Pageable pageable) {
        return landRepository.findTop5ByDistrictAndAddress(district, address, pageable);
    }

    public List<Land> searchByDistrict(String district,Pageable pageable) {
        return landRepository.findTop5ByDistrict(district, pageable);
    }

    public List<Land> searchByAddress(String address, Pageable pageable) {
        return landRepository.findTop5ByAddress(address, pageable);
    }

    public List<Land> searchByDistrictFullText(String district, Pageable pageable) {

        return landRepository.findTop5ByDistrictFullText(district, pageable);
    }

}

// 동만 -> 그동으로 검색해서 리스트를 10개띄워저
// 그중에 고르면 거기로 가는거야 ㅇㅋ?
