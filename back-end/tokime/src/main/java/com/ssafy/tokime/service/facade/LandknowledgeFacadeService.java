package com.ssafy.tokime.service.facade;

import com.ssafy.tokime.model.Landknowledge;
import com.ssafy.tokime.service.LandknowledgeService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class LandknowledgeFacadeService {

    private LandknowledgeService landknowledgeService;

    public LandknowledgeFacadeService(LandknowledgeService landknowledgeService){this.landknowledgeService = landknowledgeService;}

    public List<Landknowledge> getKnowledgeByCategory(Long knowledgeCategory){return landknowledgeService.selectAllKnowledgeByKnowledgeCategory(knowledgeCategory);}
}
