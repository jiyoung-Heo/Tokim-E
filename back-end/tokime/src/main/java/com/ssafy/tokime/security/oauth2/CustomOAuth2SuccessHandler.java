package com.ssafy.tokime.security.oauth2;

import com.ssafy.tokime.config.ServerConfig;
import com.ssafy.tokime.security.dto.CustomOAuth2User;
import com.ssafy.tokime.security.dto.GeneratedToken;
import com.ssafy.tokime.security.jwt.JwtUtil;
import com.ssafy.tokime.security.util.ROLE;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;
    private final ServerConfig config;

    public CustomOAuth2SuccessHandler(JwtUtil jwtUtil, ServerConfig config) {
        this.jwtUtil = jwtUtil;
        this.config = config;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        logger.info("인증성공");
        // OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();
        String email = customUserDetails.getData();
        String role = ROLE.USER.name();

        GeneratedToken token = jwtUtil.generateToken(email, role);
        logger.info("jwtAccessToken = " + token.getAccessToken());
        response.addCookie(createCookie("Authorization", token.getAccessToken()));

        response.sendRedirect(config.getFront()+"/main");
//        response.sendRedirect("http://localhost:3000/parent");
//        response.sendRedirect("https://i11b302.p.ssafy.io/parent");
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
//        cookie.setMaxAge(60 * 60 * 60);
        //https설정
        cookie.setSecure(true);
        cookie.setPath("/");
//        cookie.setHttpOnly(true);

        return cookie;
    }
}
