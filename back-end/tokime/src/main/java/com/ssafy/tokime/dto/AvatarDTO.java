package com.ssafy.tokime.dto;

import com.ssafy.tokime.model.Avatar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvatarDTO {
    private Long avatarIdx;
    private String countryName;
    private String avatarFile;
    private boolean currUse;

    public AvatarDTO(Avatar avatar) {
        this.avatarFile = avatar.getAvatarFile();
        this.countryName = avatar.getNation().getCountryName();
        this.avatarIdx = avatar.getAvatarIdx();

    }

    public static Avatar toEntity(final AvatarDTO dto) {
        return Avatar.builder()
                .avatarIdx(dto.getAvatarIdx())
                .build();
    }
}
