package com.ssafy.tokime.security.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
// @RedisHash: Hash Collection을 명시하는 어노테이션
// RedisHash- key: jwtToken + @id 값
// timeToLive: 초단위로 언제까지 데이터가 존재할건지
@RedisHash(value = "jwtToken", timeToLive = 60 * 60 * 24 * 14) // 14DAYS
public class RefreshToken implements Serializable {

    @Id
    private String id;
//  @Indexed: jpa처럼 사용가능 (findByAccessToken)
    @Indexed
    private String accessToken;

    private String refreshToken;

    private String oauthToken;  // 카카오 accessToken 필드 추가


    public void updateAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

}