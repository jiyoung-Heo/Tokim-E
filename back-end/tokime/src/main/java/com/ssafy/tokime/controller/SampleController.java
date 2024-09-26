package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.AvatarDTO;
import com.ssafy.tokime.dto.ResponseDTO;
import com.ssafy.tokime.model.Avatar;
import com.ssafy.tokime.service.facade.AvatarFacadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/avatar")
public class SampleController {
    AvatarFacadeService avatarService;

    @Autowired
    public SampleController(AvatarFacadeService avatarFacadeService) {
        this.avatarService = avatarFacadeService;
    }

    @GetMapping("/") //모든 아바타를 반환하는 api
    public ResponseEntity<?> getAllAvatars() {
        try {
            List<Avatar> allAvatars = avatarService.getAllAvatars();

            List<AvatarDTO> dtos = allAvatars.stream().map(AvatarDTO::new).collect(Collectors.toList());

            return ResponseEntity.ok().body("반갑습니다?");
            //return null;
        } catch (Exception e) {
            ResponseDTO<AvatarDTO> response = ResponseDTO.<AvatarDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
