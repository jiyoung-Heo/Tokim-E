package com.ssafy.tokime.security.jwt;

import com.ssafy.tokime.security.dto.GeneratedToken;
import com.ssafy.tokime.security.service.RefreshTokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {
    Logger logger = LoggerFactory.getLogger(getClass());

    private SecretKey secretkey;
    private long expires;
    private long refreshExpires;
    private final RefreshTokenService tokenService;


    @Autowired
    public JwtUtil(@Value("${spring.jwt.secret}") String key, @Value("${spring.jwt.expires}") long expires, @Value("${spring.jwt.refresh-expires}") long refreshExpires, RefreshTokenService tokenService
    ) {
        this.secretkey = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
        this.expires = expires;
        this.refreshExpires = refreshExpires;
        this.tokenService = tokenService;
    }

    public GeneratedToken generateToken(String data, String role, String oauthToken) {
        // refreshToken과 accessToken을 생성한다.
        String refreshToken = generateRefreshToken(data, role);
        String accessToken = generateAccessToken(data, role);

        // Redis에 JWT 토큰과 함께 카카오 accessToken 저장
        tokenService.saveTokenInfo(data, refreshToken, accessToken, oauthToken);

        return new GeneratedToken(accessToken, refreshToken, oauthToken);
    }

    public String generateRefreshToken(String data, String role) {
        Date now = new Date();
        return Jwts.builder()
                .claim("data", data)
                .claim("roles", role)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshExpires))
                .signWith(secretkey)
                .compact();
    }


    public String generateAccessToken(String data, String role) {
        Date now = new Date();
        return Jwts.builder()
                .claim("data", data)
                .claim("roles", role)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expires))
                .signWith(secretkey)
                .compact();
    }

    public String seperateBearer(String token){
        return token.substring(7);
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String getData(String token) {
        return Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token).getBody().get("data", String.class);
    }

    public String getRole(String token) {
        return Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token).getBody().get("roles", String.class);
    }


    public Boolean isExpired(String token) {
        try {
            logger.info(token);
            Claims claims = Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token).getBody();
            Date expirationDate = claims.getExpiration();
            logger.info("만료기간: " + expirationDate.toString());
            logger.info("현재시간이 만료시간보다 이전인가?: " + expirationDate.after(new Date()));
            System.out.println("만료시간보다" + expirationDate.toString());
            return expirationDate.before(new Date()); // 현재 시간보다 만료 시간이 이전인지 확인
        } catch (ExpiredJwtException e) {
            logger.info("만료된 토큰입니다.");
            return true;
        } catch (Exception e) {
            logger.error("토큰 검증 중 오류 발생: " + e.getMessage());
            return false;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.info("잘못된 토큰 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 토큰입니다.");
        } catch (IllegalArgumentException | MalformedJwtException e) {
            logger.error(e.toString());
            logger.error(e.getMessage());
            logger.info("잘못된 토큰입니다.");
        }
        return false;
    }

}
