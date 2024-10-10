package com.ssafy.tokime.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class TokenResponseStatusDto {

    private Integer status;
    private String accessToken;

    public static TokenResponseStatusDto addStatus(Integer status, String accessToken) {
        return new TokenResponseStatusDto(status, accessToken);
    }
}