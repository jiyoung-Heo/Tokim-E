package com.ssafy.tokime.security.dto;

import org.hibernate.query.ParameterLabelException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class KakaoResponse implements OAuth2Response {

    private final Map<String, Object> attribute;
    SimpleDateFormat format = new SimpleDateFormat("yyyy");

    public KakaoResponse(Map<String, Object> attribute) {

        this.attribute = (Map<String, Object>) attribute.get("kakao_account");
        this.attribute.put("id",attribute.get("id"));
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getProviderId() {
        return attribute.get("id").toString();
    }

    @Override
    public String getEmail() {
        return attribute.get("email").toString();
    }

    @Override
    public String getName() {
        return attribute.get("name").toString();
    }

    @Override
    public Date getBirthYear() {
        try {
            return format.parse(attribute.get("birthyear").toString());
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public String toString() {
        return "KakaoResponse{" +
                "attribute=" + attribute +
                '}';
    }
}
