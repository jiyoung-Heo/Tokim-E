# Tokim-E
토지매입사기방지서비스

## 기술 스택, 빌드 버전 및 기타 도구
![image.png](exec/Tokim-E서버구조도.png)

### Frontend
- 언어 : Javascript
- 라이브러리 : React (v5.0.1)
- CSS : styled components

### Backend
- JVM : Java(17)
- 프레임 워크 : Spring boot (v3.3.3)
  - gradle : 8.10
- 데이터 베이스 : MySQL (v8), Redis (v7.4)
- 보안 : Spring-Security, JWT
- 프록시 서버 : Nginx (v1.27.1)
- Hadoop(v3.4.0)
  - JVM : Java(11)
- Elasticsearch(v8.15.1)
- Kibana(v8.15.1)

### Infra
- 서버 : AWS EC2 ubuntu 20.04.6 LTS
- CI/CD 도구 : Gitlab, Jenkins (v2.452.3), Docker (v27.2.1), Docker-compose (v1.29.2)

### 기타 도구
- 개발 도구 : VsCode (v1.90.2), IntelliJ (v2024.1.4)
- 일정 관리 : Jira, Notion
- 커뮤니케이션 : MatterMost
- 디자인 : Figma

## 빌드 

### 1. jenkins

a. EC2 내부에 접속해서 jenkins 직접 설치
``` shell
docker pull jenkins/jenkins:jdk17
docker run -d -p 8081:8080 -p 50000:50000 \
  -v /jenkins:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name jenkins \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  -u root jenkins/jenkins:jdk17
```
- 포트 8081:8080
- -v : 컨테이너의 /var/jenkins_home을 로컬의 /jenkins 디렉토리와 공유
- -e JENKINS_OPTS 필수!! nginx에서 /jenkins로 받아줄거니까 꼭 써주기
- **v /var/run/docker.sock:/var/run/docker.sock:** Docker 소켓을 공유하는 방식 사용
- `/var/run/docker.sock`을 Jenkins 컨테이너에 마운트하면, Jenkins 내부에서 Docker 명령을 실행할 수 있음

b. j11b207.p.ssafy.io/jenkins 경로에 접속하여 파이프 라인 구축하기.
- jenkins pipeline은 back-end, front-end 소스코드 내 위치

### 2. MySQL,Redis
``` shell
docker run --name mysql -e MYSQL_ROOT_PASSWORD={비밀번호} -d -p 3306:3306 mysql:8.0.39
docker run --name resis -d -p 6379:6379 redis
```

### 3. Nginx

**Nginx 설정**

a. default.conf
파일 위치는 컨테이너 내부 기준 /etc/nginx/conf.d/default.conf \
[default.conf](exec/default.conf)
[default.conf](exec/default2.conf)

### 부록 - Frontend,Backend Dockerfile, jenkinsfile

1. Frontend Dockerfile \
[Frontend Dockerfile](front-end/tokime/dockerfile)
2. Frontend Jenkinsfile \
[Frontend Jenkinsfile](front-end/tokime/jenkinsfile)
3. Backend Dockerfile \
[Backend Dockerfile](back-end/tokime/dockerfile)
4. Backend Jenkinsfile \
[Backend Jenkinsfile](back-end/tokime/jenkinsfile)

## 환경변수 설정

### 1. Frontend
a. frontend 설정파일 \
경로: front-end/tokime/.env
``` yaml
REACT_APP_API_URL={백엔드서버url}
REACT_APP_CUSTOM_KEY={사용자key}
REACT_APP_ES_API_URL={es관련}
REACT_APP_ES_ID={es관련}
REACT_APP_ES_PWD={es관련}
REACT_APP_NAVERMAP_API_KEY={네이버지도관련}
REACT_APP_NAVERMAP_SECRET_KEY={네이버지도관련}
REACT_APP_OPEN_AI_KEY={openai}
```
### 2. Backend
a. backend 설정파일 폴더 \
경로: back-end/tokime/.env
``` yaml
PORT={실행포트}
# mysql
MYSQL_HOST==
MYSQL_PORT=
MYSQL_DATABASE=
MYSQL_USERNAME=
MYSQL_PASSWORD=
# redis
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
# 연결 url
FRONT_HOST=
BACK_HOST=
# oauth2
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
KAKAO_CLIENT_ID=
# jwt
JWT_SECRET=
#swagger
SWAGGER_UI=
SWAGGER_DOCS=
```

## 외부 서비스 정보

### 1. 소셜 인증

고령층이 주 사용자임을 고려하여 간단한 로그인 방식을 채택하였다.

a. 백엔드 설정파일\ 

[Backend env file](back-end/tokime/.env)

client-id, client-secret, redirect-uri, authorization_uri, token_uri, user-info-uri 등의 auth 코드, access 토근 발급에 필요한 정보를 입력.

로그인 시 access-token, email, role 정보를 jwt를 이용하여 토큰화하고 redis에 저장한다. 

### 2. OpenAI API

관련법률 및 규제정보의 조항 데이터를 가지고 openai를 통해 해당 조항에 대한 설명을 요청하고 응답받는다. 

npm install openai 을 해서 외부 라이브러리를 설치.

a. 프론트엔드 설정파일[Frontend env file](front-end/koplaydev/.env)
OPEN_AI_KEY에 본인의 OPENAI API 키를 입력.


### 3. KAKAO POSTCODE API

지번검색과 투자예정지의 주소 검색에 활용한다.
사용자가 직접 모든 주소를 입력하지 않거나, 잘못된 오타를 입력하더라도 유사한 주소를 추천할 수 있다. 또한, 도로명 주소와 지번 주소를 모두 제공하기 때문에 사용자가 어떤 주소를 입력하던지 국토교통부에서 제공하는 데이터가 존재하는 주소라면 데이터를 제공해 줄 수 있다.

a. 프론트엔드 설정파일[Frontend index.html file](front-end/public/index.html)
index.html의 헤드 태그 안에 <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script> 넣어서 사용.
b. 프론트엔드 실행파일
new window.daum.Postcode를 사용해서 검색창 실행

- 백에서 활용한거

### 4. NAVER MAP API

지번검색, 투자예정지, 위험지도, 기획부동산의심신고에 사용한다.

- 지번검색
  - kakao postcode api의 주소를 geocoding하여 경위도 좌표를 이용해서 지도 중심으로 설정
  - 커스텀 마커 기능을 이용해서 개발 가능성을 기준으로 세개의 마커 제공
- 투자예정지
  - 나의 투자예정지 목록의 썸네일로 활용
  - kakao postcode api의 주소를 geocoding하여 경위도 좌표를 이용해서 지도 중심으로 설정
  - 커스텀 마커 기능을 이용해서 개발 가능성을 기준으로 세개의 마커 제공
- 위험지도
  - geolocation 기능을 이용해서 사용자 접속 위치를 지도의 초기 중심 좌표로 설정
  - 커스텀 마커 기능을 이용해서 신고를 의미하는 빨간색 마커 사용
  - 마커 클릭이벤트 기능을 이용해서 마커 클릭시 모달창으로 해당 마커의 신고제목과 신고내용 출력
- 기획부동산의심신고
  - geolocation 기능을 이용해서 사용자 접속 위치를 지도의 초기 중심 좌표로 설정
  - geocoding 기능을 이용해서 주소 검색을 통해 마커를 찍고 경위도 좌표를 설정하는 기능
  - 지도의 클릭이벤트를 통해 마커를 찍고 경위도 좌표를 설정하는 기능
  - 지도 클릭시 reverse geocoding 기능을 활용해서 유효하지 않은 주소(외국, 바다)는 마커가 찍히지 않도록 함

a. 프론트엔드 설정파일[Frontend index.html file](front-end/public/index.html)
index.html의 헤드 태그 안에 <script
      type="text/javascript"
      src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=%REACT_APP_NAVERMAP_API_KEY%&submodules=geocoder"
    ></script> 넣어서 사용.

- ncpClientId = 네이버 맵 api의 clientId key
- submodules = 네이버 맵 api 기술문서에서 제공하는 서브모듈 작성

[Frontend env file](frontend/tokime/.env)

- REACT_APP_NAVERMAP_API_KEY에 네이버 맵 api의 clientId key 입력
- REACT_APP_NAVERMAP_SECRET_KEY에 네이버 맵 api의 secret key 입력

b. 네이버맵 api 요청 경로

- https://openapi.map.naver.com/~~
  - 네이버 맵 api의 clientId key가 헤더에 포함되어야 함
  - REACT_APP_NAVERMAP_API_KEY
- https://naveropenapi.apigw.ntruss.com/~~~
  - 네이버 맵 api의 clientId, secret Key가 헤더에 포함되어야 함

c. 참고사항

- (X-NCP-APIGW-API-KEY-ID) = client Id
- (X-NCP-APIGW-API-KEY) = secret Key

d. 호출 경로 구성

- 프론트에서 naver api를 직접 호출하지 못하기 때문에 nginx 프록시를 이용하여 호출함
- nginx 구성
```shell
    ...
    # CORS
    add_header Access-Control-Allow-Origin "*";
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    add_header Access-Control-Allow-Headers "Authorization, Content-Type";
    
    location /geo-maps/ {
        proxy_pass https://naveropenapi.apigw.ntruss.com/;
        proxy_set_header Host naveropenapi.apigw.ntruss.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header X-NCP-APIGW-API-KEY-ID 80nhbf20ha;
        proxy_set_header X-NCP-APIGW-API-KEY 0BKQHoYLnwN5EIZFKRYKBXLMkHcneZRg10BD640z;

    }

    location /maps/ {
        proxy_pass https://openapi.map.naver.com/;
        proxy_set_header Host openapi.map.naver.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header X-NCP-APIGW-API-KEY-ID 80nhbf20ha;

    }
    ...
```
