package com.ssafy.tokime.service.facade;

import com.ssafy.tokime.model.Avatar;
import com.ssafy.tokime.service.AvatarService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AvatarFacadeService {
    private AvatarService avatarService;

    @Autowired
    public AvatarFacadeService(AvatarService avatarService) {
        this.avatarService = avatarService;
    }

    public List<Avatar> getAllAvatars(){
        return avatarService.getAllAvatars();
    }
}
