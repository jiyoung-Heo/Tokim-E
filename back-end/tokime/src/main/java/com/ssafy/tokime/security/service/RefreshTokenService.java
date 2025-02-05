package com.ssafy.tokime.security.service;

import com.ssafy.tokime.security.model.RefreshToken;
import com.ssafy.tokime.security.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RefreshTokenService {
    Logger logger = LoggerFactory.getLogger(getClass());

    private final RefreshTokenRepository repository;

    /**
     * 토큰 저장하기
     *
     * @param data
     * @param refreshToken
     * @param accessToken
     * @param oauthToken
     * @author 허지영
     */
    public void saveTokenInfo(String data, String refreshToken, String accessToken, String oauthToken) {
        logger.info("Saving token info");
        logger.info("refreshToken: " + refreshToken);
        logger.info("accessToken: " + accessToken);
        logger.info("oauthToken: " + oauthToken);
        logger.info("data: " + data);

        // RefreshToken 객체에 kakaoAccessToken도 함께 저장
        RefreshToken save = repository.save(new RefreshToken(data, accessToken, refreshToken, oauthToken));

        // 저장된 토큰 정보 확인
        System.out.println(save.getId() + " 아이디입니다");
        Optional<RefreshToken> result = repository.findById(save.getId());

        // 저장된 데이터가 존재하는지 확인
        if (result.isPresent()) {
            logger.info("save result: " + result.get().toString());
        } else {
            throw new RuntimeException("Database has no Data");
        }
    }

    /**
     * 토큰 삭제하기
     * @author 허지영
     * @param accessToken
     */
    public void removeRefreshToken(String accessToken) {
        RefreshToken token = findByAccessToken(accessToken)
                .orElseThrow(IllegalArgumentException::new);

        repository.delete(token);
    }

    public Optional<RefreshToken> findByAccessToken(String accessToken) {
        return repository.findByAccessToken(accessToken);
    }

    public void updateAccessToken(RefreshToken resultToken){
        repository.save(resultToken);
    }
}