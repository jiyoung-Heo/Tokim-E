package com.ssafy.tokime.service;


import com.ssafy.tokime.model.Land;
import com.ssafy.tokime.repository.LandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LandService {
    @Autowired
    LandRepository landRepository;

    public List<Land> getAllLands(){
        return landRepository.findAll();
    }
    public List<Land> searchLands(String district, String address) {
        return landRepository.findTop5ByDistrictAndAddress(district, address);
    }

}
