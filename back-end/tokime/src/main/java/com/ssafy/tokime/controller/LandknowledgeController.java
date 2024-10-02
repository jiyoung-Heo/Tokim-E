package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.LandknowledgeDTO;
import com.ssafy.tokime.dto.ResponseDTO;
import com.ssafy.tokime.model.Landknowledge;
import com.ssafy.tokime.service.facade.LandknowledgeFacadeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/knowledge")
public class LandknowledgeController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private LandknowledgeFacadeService landknowledgeService;

    @Autowired
    public LandknowledgeController(LandknowledgeFacadeService landknowledgeFacadeService){
        this.landknowledgeService = landknowledgeFacadeService;
    }

    // 지식 정보 조회
    @GetMapping("")
    private ResponseEntity<?> getKnowledgeInfo(@RequestParam Long knowledgeCategory){
        try{
            List<Landknowledge> landknowledges = landknowledgeService.getKnowledgeByCategory(knowledgeCategory);
            List<LandknowledgeDTO> dtos = landknowledges.stream().map(LandknowledgeDTO::new).collect(Collectors.toList());

            return ResponseEntity.ok().body(dtos);
        } catch(Exception e){
            logger.error("Error while retrieving knowledge information", e);
            ResponseDTO<LandknowledgeDTO> response = ResponseDTO.<LandknowledgeDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
