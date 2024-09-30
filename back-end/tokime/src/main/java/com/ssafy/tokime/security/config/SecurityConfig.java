package com.ssafy.tokime.security.config;

import com.ssafy.tokime.config.ServerConfig;
import com.ssafy.tokime.security.jwt.JwtFilter;
import com.ssafy.tokime.security.jwt.JwtUtil;
import com.ssafy.tokime.security.oauth2.CustomLogoutHandler;
import com.ssafy.tokime.security.oauth2.CustomOAuth2SuccessHandler;
import com.ssafy.tokime.security.oauth2.CustomUserFailureHandler;
import com.ssafy.tokime.security.service.CustomOAuth2UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity

public class SecurityConfig {
    private final ServerConfig serverConfig;
    private final JwtUtil jwtUtil;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;
    private final CustomLogoutHandler customLogoutHandler;
    private final CustomUserFailureHandler customUserFailureHandler;

    @Autowired
    public SecurityConfig(ServerConfig serverConfig, JwtUtil jwtUtil, CustomOAuth2UserService customOAuth2UserService, CustomOAuth2SuccessHandler customOAuth2SuccessHandler, CustomLogoutHandler customLogoutHandler, CustomUserFailureHandler customOAuth2FailureHandler) {
        this.serverConfig = serverConfig;
        this.jwtUtil = jwtUtil;
        this.customOAuth2UserService = customOAuth2UserService;
        this.customOAuth2SuccessHandler = customOAuth2SuccessHandler;
        this.customLogoutHandler = customLogoutHandler;
        this.customUserFailureHandler = customOAuth2FailureHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        return httpSecurity
                //cors
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Arrays.asList(serverConfig.getBack(), serverConfig.getFront()));
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);
                        configuration.setExposedHeaders(Collections.singletonList("Set-Cookie"));
                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return configuration;
                    }
                }))
                //HTTP Basic 인증 방식 disable
                .httpBasic(httpBasic -> httpBasic.disable())
                //csrf disable
//                .headers(headers -> headers.cacheControl().disable())
                .csrf(csrf -> csrf.disable())
                //세션 설정 : STATELESS
                .sessionManagement(
                        sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //경로별 인가 작업
                .authorizeHttpRequests(
                        authorize ->
                                authorize
                                        .requestMatchers("/**").permitAll()
                                        .requestMatchers("/swagger-ui/**").permitAll()
                                        .requestMatchers("/v3/**").permitAll()
                                        .requestMatchers("/login/oauth2/**").permitAll()
                                        .requestMatchers("/swagger-resources/**").permitAll()
//                                        .requestMatchers("/parent/**").hasRole(ROLE.USER.getRoles())
                                        .anyRequest().permitAll())
//                                        .anyRequest().authenticated())
                //filter 추가
                //oauth2 인증 전에 JWT토큰을 검증할 jwtfilter 돌도록
                .addFilterBefore(new JwtFilter(jwtUtil), OAuth2LoginAuthenticationFilter.class)

                //oauth2
                .oauth2Login((oauth2) -> oauth2
                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                .userService(customOAuth2UserService))
                        .successHandler(customOAuth2SuccessHandler)
                )
                .logout(logout -> logout
                                .logoutSuccessHandler(customLogoutHandler) // 로그아웃 성공 처리 핸들러
                        // 로그아웃 성공 후 리다이렉트될 URL 등 추가 설정 가능
                )
//                .exceptionHandling(exceptionHandling ->
//                        exceptionHandling
//                                .authenticationEntryPoint((request, response, authException) ->
//                                        response.sendRedirect("/custom-login?error=true"))  // 인증 실패 시 리다이렉트
//                )
                .build()
                ;

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
