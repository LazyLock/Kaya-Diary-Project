# 개요

## 목적

### Node.js와 Open API를 결합하여 js로 구성된 독자적인 웹사이트를 구현한다.

## 결과물

<img src="https://github.com/user-attachments/assets/13199d8b-bba1-4058-9598-c9d3a37959eb">

# 코드 분석

## 전체적인 구성

### 프론트엔드

- html / css
- javascript

### 백엔드

- node.js
    - 사용한 패키지
        - nunjucks
        - axios
        - express
        - mysql2
        - sequelize
        - sequelize-cli
        - dotenv
        - nodemon
- mySQL

## 구조

### app.js

- 프로젝트의 진입포인트
- 위에 언급한 패키지들을 불러와 기초적인 세팅을 완료

### views

- nunjucks 엔진을 사용했기 때문에 레이아웃은 layout.html로 통일되어 있다.
- html 파일들이 저장되어 있다.
    - modify.html
    - error.html
    - diary_detail.html
    - main.html

### routes

- 페이지들을 이어주기 위한 라우터들의 집합이다.
- 도메인 주소에 대한 get/post 요청이 이곳에서 처리된다.
- 기능별로 최대한 분리된 라우터들이 저장되어 있다.
    - complete.js
    - delete.js
    - diary.js
    - index.js
    - modify.js

### models

- 데이터베이스를 이어주는 역할을 한다.
- index.js가 모든 스키마들을 연결해주는 역할을 하며, index 이외의 파일들은 스키마 목록이다.

### public

- app.js 에서 path를 이용해 정적 파일을 이곳에서 가져오도록 경로를 미리 설정했다.
- main.js 는 KakaoMap API를 활용한 코드가 들어있다.
    - 기존 기능
        - main.html 과 연결되어 화면에 지도를 렌더링해준다.
    - 추가한 기능
        - 마커를 클릭했을 때 조그마한 창과 함께 보기 버튼을 추가해준다.
        - 버튼을 클릭했을 때 모달창이 나타나며 다이어리 작성이 가능하다.
- 정적 파일들이 여기에 저장되어 있다.
    - css / js / img 등

# 발전 및 제언

### 1. 카카오맵이 화면에 표시되는 속도가 개인이 사용하는 인터넷 속도에 영향을 받는다.

- async / await 문법을 더 깊이 이해할 필요가 있다. (원리와 적절한 사용에 대해)

### 2. 실제 환경에서 배포를 진행할 필요가 있다.

- 기본 DB인 mySQL을 사용하고 있으므로 더 많은 데이터를 저장할 수 있을 새로운 DB를 찾아야한다.
- 로컬 도메인이 아닌 aws를 사용하여 서버 관리를 경험하며 실제 트래픽을 다뤄봐야한다.

### 3. UI와 레이아웃, 디자인 등을 직관적으로 바꿀 수 있다.
