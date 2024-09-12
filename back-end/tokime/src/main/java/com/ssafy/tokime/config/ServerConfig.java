package com.ssafy.tokime.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "server.url")
public class ServerConfig {

    private String front;
    private String back;

}