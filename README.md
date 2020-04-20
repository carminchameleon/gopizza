### 프로젝트 소개

GOPIZZA 직원들의 동기부여를 위한 랭킹 보드 시스템 개발 프로젝트입니다. 

[프로젝트 소개 PPT URL](https://docs.google.com/presentation/d/e/2PACX-1vR2SUN0QFHDZaLjHfjfot8na5aEdYGLGFxElQwxYAnwExe4bNSMMzSyPRnIzwhtYC-tZO_6pB8TC1Z1/pub?start=false&loop=false&delayms=3000&slide=id.p](https://docs.google.com/presentation/d/e/2PACX-1vR2SUN0QFHDZaLjHfjfot8na5aEdYGLGFxElQwxYAnwExe4bNSMMzSyPRnIzwhtYC-tZO_6pB8TC1Z1/pub?start=false&loop=false&delayms=3000&slide=id.p))

### 개발 인원 및 기간

- 기간 : 20.03.23 - 20.04.17
- 구성 : 프론트엔드 4명, 백엔드 2명 (총 6명)
- [백엔드 깃헙주소](https://github.com/hong-dev/wepizza-backend)
- [프론트엔드 깃헙주소](https://github.com/akiakma/gopizza)

### 적용 기술 및 구현 기능

**적용 기술** 

Front-end : React, Typescript, Hooks, Styled-Components

Back-end : Python, Django Web Framework, Docker, CORS headers

Deployment : AWS EC2, RDS, S3

- Python
- Django Web Framework
- AWS EC2, RDS, S3
- CORS headers
- MySQL
- Git, Github
- Docker

**구현 기능**

**User**

- 회원가입, 로그인 (Bcrypt, JWT)
- 이메일 인증
- 비밀번호 재발급
- 이미지 업로드 (AWS S3, boto3, Pillow, BytesIO)

**Store Map**

- Store 위치정보 (주소, 위도, 경도)
- Store별 유저 정보

**Record**

- 각 유저의 점수 요약 모달 창 구현
- 필터에 따라 유저별 지점별 결과 구현
- 시간별 순위 구현
- 리프레시 버튼을 통해 랭킹 실시간 업데이트

System

- 유저별 Quest 및 점수 확인
- 리워드 신청
- Admin Mypage 리워드 조회 및 지급 (유저 이메일 발송)


### 프로젝트 데모 영상
[![Wepizza Project Demo](https://user-images.githubusercontent.com/53142539/79748620-b3769b00-8348-11ea-9266-4b56ddaa95e0.png
)](https://youtu.be/RD1Ucct_ahg)


### API Documentiaion

- [백엔드 엔드포인트 API 1 (User, Store)](https://documenter.getpostman.com/view/10398655/SzezbB9y?version=latest)
- [백엔드 엔드포인트 API 2 (Record, Quest)](https://documenter.getpostman.com/view/10398655/Szf6Wnsu?version=latest)

