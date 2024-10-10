package com.ssafy.tokime.security.oauth2;

import com.ssafy.tokime.security.jwt.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomLogoutHandler extends SimpleUrlLogoutSuccessHandler {
    private final JwtUtil jwtUtil;

    public CustomLogoutHandler(JwtUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        logger.info("로그아웃완료");
        // JWT 토큰을 무효화하거나 관련된 처리를 수행합니다.
        String token = jwtUtil.resolveToken(request); // 요청에서 JWT 토큰을 가져오는 메소드 (예시)
        if (token != null) {
            // JWT 토큰을 무효화하는 로직을 추가할 수 있습니다.
            // 예: 블랙리스트에 추가하거나 DB에 저장
        }

        // Authorization 쿠키 삭제

        response.addCookie(createCookie("Authorization", null, 0)); // 쿠키를 삭제하는 방법
        request.getSession().invalidate();

        // 로그아웃 성공 후 리다이렉트할 URL 설정
//        super.setDefaultTargetUrl("/loginsucc"); // 로그아웃 후 리다이렉트할 URL
//        super.onLogoutSuccess(request, response, authentication);
        logger.info("logout successful");
    }

    private Cookie createCookie(String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/"); // 쿠키의 경로 설정
        cookie.setMaxAge(maxAge); // 쿠키의 유효시간 설정

        return cookie;
    }
}
