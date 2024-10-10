package com.ssafy.tokime.service;

import com.ssafy.tokime.model.Landknowledge;
import com.ssafy.tokime.repository.LandknowledgeRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class LandknowledgeService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private LandknowledgeRepository landknowledgeRepository;

    @Autowired
    public LandknowledgeService(LandknowledgeRepository landknowledgeRepository){this.landknowledgeRepository = landknowledgeRepository;}

    public List<Landknowledge> selectAllKnowledgeByKnowledgeCategory(Long knowledgeCategory){
        List<Landknowledge> knowledges = landknowledgeRepository.findAllByKnowledgeCategory(knowledgeCategory);
        return knowledges;

    }
}
