package com.ssafy.tokime.security.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final UserDTO userDTO;

    public CustomUserDetails(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return "ROLE_" + userDTO.getRoles();

            }
        });

        return collection;
    }

    @Override
    public String getPassword() {
        return userDTO.getData();
    }

    @Override
    public String getUsername() {
        return userDTO.getData();
    }
}
