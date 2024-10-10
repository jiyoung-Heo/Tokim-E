package com.ssafy.tokime.security.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ROLE {
    USER ("USER");

    private final String roles;
}