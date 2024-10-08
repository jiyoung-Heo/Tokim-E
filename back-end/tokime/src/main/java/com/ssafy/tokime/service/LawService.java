package com.ssafy.tokime.service;

import com.ssafy.tokime.dto.LawSearchDTO;
import com.ssafy.tokime.model.Law;
import com.ssafy.tokime.repository.LawRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.List;

@Service
@Transactional
public class LawService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private LawRepository lawRepository;

    @Autowired
    public LawService(LawRepository lawRepository){this.lawRepository = lawRepository;}

    public List<Law> selectAllLawByDistrict(Long lawDistrict){
        List<Law> laws = lawRepository.findAllByLawDistrict(lawDistrict);

        if (laws.isEmpty()) {
            throw new NoSuchElementException("해당하는 조례가 없습니다.");
        }
        return laws;
    }

    public List<Law> seacrchLawByLandUse(LawSearchDTO dto){
        Long lawDistrict=dto.getLawDistrict();
        String lawLandUse= dto.getLawLandUse();
        if (lawLandUse == null) {
            return lawRepository.findAllByLawDistrict(lawDistrict);
        }
       return lawRepository.findAllByLawDistrictAndLawLandUseContaining(lawDistrict,lawLandUse);
    }
}
