package com.ssafy.tokime.security.jwt;


import com.ssafy.tokime.security.dto.CustomOAuth2User;
import com.ssafy.tokime.security.dto.UserDTO;
import com.ssafy.tokime.security.util.ROLE;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final List<String> skipUrls = List.of("/oauth2", "/login/oauth2/code", "token/");
    private JwtUtil jwtUtil;

    @Autowired
    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        logger.info("shouldNotFilter");
        return request.getRequestURI().contains("/token/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //cookie들을 불러온 뒤 Authorization Key에 담긴 쿠키를 찾음
        String authorization = null;
        Cookie[] cookies = request.getCookies();

        String path = request.getRequestURI();
        logger.info("path: " + path);
        if (path.equals("/login")) {
            filterChain.doFilter(request, response);
            return;
        }
        if (skipUrls.stream().anyMatch(path::startsWith)) {
            logger.info("매치됨 "+skipUrls.stream().toList().toString());
            filterChain.doFilter(request, response);
            return;
        }

        if (cookies != null) {

            for (Cookie cookie : cookies) {
                logger.info("cookie.getName: " + cookie.getName());
                if (cookie.getName().equals("Authorization")) {

                    authorization = cookie.getValue();
                }
            }
        }

        //Authorization 헤더 검증
        if (authorization == null) {
            logger.info("token null");
            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //토큰
        String token = authorization;

        //토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {
            //여기로넘어가버림
            logger.info("token expired");

            filterChain.doFilter(request, response);
            //여기서 어떻게 처리를 해야할까??
            return;
        }

        //토큰에서 username과 role 획득
        String username = jwtUtil.getData(token);
        System.out.println(username);
        String role = jwtUtil.getRole(token);
        logger.info("username: " + username);
        logger.info("role: " + role);

        //userDTO를 생성하여 값 set
        UserDTO userDTO = new UserDTO();
        userDTO.setData(username);
        userDTO.setRoles(role);

        Authentication authToken = null;
        if (ROLE.USER.toString().equals(role)) {
            //UserDetails에 회원 정보 객체 담기
            CustomOAuth2User customOAuth2User = new CustomOAuth2User(userDTO);
            //스프링 시큐리티 인증 토큰 생성
            authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
        }

        // 추가: 인증 정보 로그 출력
        logger.info("Authenticated user: " + username + " with roles: " + role);
        //세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);
    }


}

