<div align="center">
  <br />
  <img src="https://i.imgur.com/iLXcSkF.png?1" title="source: imgur.com" alt="logo" width="550px" height="300px"/>
  <br />
  <!-- 서버 비용 문제로 배포 중단 -->
  <!-- <h1>:tent: <a href="http://ec2-52-79-70-218.ap-northeast-2.compute.amazonaws.com/">딩굴딩굴 - 캠핑장</a></h1> -->
  <h1>:tent: 딩굴딩굴 - 캠핑장</h1>
  
  <div style="font-size: 16px">
  엘리스 소프트웨어 트랙 2기 부산 3팀의 두번째 웹 프로젝트 입니다.<br />
  캠핑장에 대한 정보를 확인하고 예약할 수 있는 홈페이지 입니다.<br />
  </div>
  <br />
  
</div>
<br />

## :memo: 기획 의도 & 목적

기존 캠핑장 예약 사이트는 특정 객실 위치를 별도의 이미지로 안내하고 있습니다. <br /><br />
그리고 예약을 하려면 예약 페이지로 이동한 후에 안내된 객실명만 가지고 예약을 진행하게 됩니다. <br /><br />
이렇게 되면 사용자가 예약하면서도 객실 위치를 직관적으로 확인을 하기 어렵다는 불편함이 있습니다.<br /><br />
그래서 저희는 이러한 불편함을 개선하는 것을 목표로 하였습니다.<br /><br />
저희가 기획한 서비스는 사용자가 지도를 통해 직접 예약 위치를 확인한 후 객실을 바로 예약할 수 있어서 일관된 흐름으로 사용자의 불편함을 개선했습니다.<br /><br /><br />


## :mag: 웹 서비스의 주제와 기능 소개
- <font size="4">주제 : 직관적인 캠핑 예약 사이트</font>
- <font size="3">메인 기능</font>
  <details>
  <summary> 1. 객실 예약 기능</summary>  
      <ul>
          <li>예약 하기</li>
          <li>예약 취소</li>
          <li>예약 확인</li>
      </ul>
    </details>
  <details>
  <summary> 2. 회원 기능</summary>
      <ul>
          <li>회원 가입</li>
          <li>로그인</li>
          <li>로그아웃</li>
          <li>회원 탈퇴</li>
          <li>회원 정보 수정</li>
          <li>예약 조회</li>
          <li>예약 취소</li>
          <li>계정 찾기</li>
      </ul>
    </details>
  <details>
  <summary> 3.  관리자 기능</summary>
      <ul>
          <li>회원 관리</li>
          <li>예약 승인</li>
          <li>예약 취소</li>
      </ul>
    </details>
  <details>
  <summary> 4.  리뷰 기능</summary>
      <ul>
          <li>리뷰 조회</li>
          <li>리뷰 작성</li>
          <li>리뷰 수정</li>
          <li>리뷰 삭제</li>
      </ul>
    </details>
  

<br />

- <font size="3">서브 기능</font>
  1.  카카오 로그인 기능
  2.  About 페이지 내 구글 맵 API 이용하여 캠핑장 지도 표시
  3.  캘린더를 활용하여 예약 날짜 확인 구현
  4.  관리자 및 유저의 예약 조회 페이지 내 페이지네이션
  5.  다녀온 객실에 대한 후기 작성
  6.  객실 이미지 캐러셀
  7.  refresh token을 통한 자동 로그인
  8.  redis저장소를 이용한 패스워드 찾기


<br /><br />

## 🛠 주요 기술 스택  🛠
<br />

### **Front-end**
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=FFFFFF"/> &nbsp;
<img alt="styled--components" src ="https://img.shields.io/badge/styled -- components-DB7093.svg?&style=for-the-badge&logo=styled-components&logoColor=333333"/>&nbsp;
<img alt="bootstrap" src ="https://img.shields.io/badge/react--bootstrap-7952B3.svg?&style=for-the-badge&logo=bootstrap&logoColor=ffffff"/>&nbsp;
<img alt="MUI" src ="https://img.shields.io/badge/material--UI-007FFF.svg?&style=for-the-badge&logo=MUI&logoColor=ffffff"/>&nbsp;
<img alt="antdesign" src ="https://img.shields.io/badge/Ant Design-0170FE.svg?&style=for-the-badge&logo=Ant Design&logoColor=ffffff"/>&nbsp;

<br />

### **Back-end**
<img alt="node.js" src ="https://img.shields.io/badge/node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=FFFFFF"/> &nbsp;
<img alt="express" src ="https://img.shields.io/badge/espress-000000.svg?&style=for-the-badge&logo=Express&logoColor=ffffff"/>&nbsp;
<img alt="passport" src ="https://img.shields.io/badge/passport-34E27A.svg?&style=for-the-badge&logo=passport&logoColor=333333"/>&nbsp;
<img alt="JWT" src ="https://img.shields.io/badge/JWT-000000.svg?&style=for-the-badge&logo=JSON Web Tokens&logoColor=ffffff"/>&nbsp;
<img alt="redis" src ="https://img.shields.io/badge/redis-DC382D.svg?&style=for-the-badge&logo=Redis&logoColor=ffffff"/>&nbsp;
<img alt="mongodb" src ="https://img.shields.io/badge/mongodb-47A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=ffffff"/>&nbsp;

<br/>

### **Dev-ops**
<img alt="gitlab" src ="https://img.shields.io/badge/gitLab-FC6D26.svg?&style=for-the-badge&logo=GitLab&logoColor=FFFFFF"/> &nbsp;
<img alt="git" src ="https://img.shields.io/badge/git-f85832.svg?&style=for-the-badge&logo=Git&logoColor=ffffff"/>&nbsp;
<img alt="discord" src ="https://img.shields.io/badge/discord-5865F2.svg?&style=for-the-badge&logo=Discord&logoColor=333333"/>&nbsp;
<img alt="nginx" src ="https://img.shields.io/badge/pm2-2B037A.svg?&style=for-the-badge&logo=pm2&logoColor=ffffff"/>&nbsp;
<img alt="pm2" src ="https://img.shields.io/badge/redis-DC382D.svg?&style=for-the-badge&logo=Redis&logoColor=ffffff"/>&nbsp;
<img alt="mongodb" src ="https://img.shields.io/badge/eslint-4B32C3.svg?&style=for-the-badge&logo=ESLint&logoColor=ffffff"/>&nbsp;
<img alt="prettier" src ="https://img.shields.io/badge/prettier-F7B93E.svg?&style=for-the-badge&logo=Prettier&logoColor=333333"/>&nbsp;
<br /><br />

## :clipboard: 프로젝트 구성도

<br/>

| [🔗프로토타입(Prototype)](https://www.figma.com/file/NstxG3reXALAHqt0wEtrIf/Untitled?node-id=0%3A1)

| [🔗API 문서](https://documenter.getpostman.com/view/21028820/UzR1K2iz)

| [🔗와이어프레임(Wireframe)]
<br /> &nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/82688516/183603499-65a2a760-d69c-42e9-86ec-560c72a9ee0b.jpeg" width="300" height="500"/>
<img src="https://user-images.githubusercontent.com/82688516/183603800-b9984edd-ec07-4171-b7eb-dc37dc2de184.jpeg" width="300" height="500"/>

| [🔗페이지 구조도]
<br />&nbsp;&nbsp;&nbsp;&nbsp;<img width="600" alt="페이지 구조도" src="https://user-images.githubusercontent.com/82688516/183605819-ec3d0410-91c4-4794-b592-4468f8c0dbb4.png">


| 🔗서비스 구성도
<br /> &nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/82688516/183544079-096b0fa2-c87b-4bfc-8201-712abe7df99b.png" width="600"/>



<br />


## 🎥 데모 영상
<br />

### 회원가입, 로그인(카카오 로그인)

&nbsp;&nbsp;&nbsp;&nbsp;![회원가입 및 로그인](https://user-images.githubusercontent.com/82688516/210493152-64108bb3-e9d0-41c2-bedf-e962dfc9242d.gif)
<br />
&nbsp;&nbsp;&nbsp;&nbsp;![카카오 로그인](https://user-images.githubusercontent.com/82688516/210493149-f308bd60-0be0-45d6-98e1-bf7a2a15fc36.gif)

### 유저 이메일 찾기, 패스워드 찾기

&nbsp;&nbsp;&nbsp;&nbsp;![이메일, 비밀번호 찾기](https://user-images.githubusercontent.com/82688516/210493148-e23e1b32-175e-46bb-a3c4-a0e967112eaf.gif)

### 지도에서 객실 예약하기

&nbsp;&nbsp;&nbsp;&nbsp;![객식 둘러보기 및 예약](https://user-images.githubusercontent.com/82688516/210493131-a891797e-2af8-4134-a99f-82272349eede.gif)

### 캘린더를 이용하여 객실 예약 하기

&nbsp;&nbsp;&nbsp;&nbsp;![예약페이지에서 바로 예약](https://user-images.githubusercontent.com/82688516/210493145-6705b793-ec44-4eef-84ed-6c463115fbad.gif)

### 유저 예약 조회, 후기 및 예약 취소

&nbsp;&nbsp;&nbsp;&nbsp;![예약조회, 후기 및 예약취소](https://user-images.githubusercontent.com/82688516/210493140-b64e2d1a-921b-413e-b4bf-31607606677d.gif)

### 유저 정보 조회 및 탈퇴

&nbsp;&nbsp;&nbsp;&nbsp;![회원정보 수정 및 탈퇴](https://user-images.githubusercontent.com/82688516/210493158-3d99159f-2c3a-4a96-ad7f-40e53f9ac2a8.gif)

### 관리자 페이지 (예약 취소 및 취소확인)

&nbsp;&nbsp;&nbsp;&nbsp;![관리자 예약취소 및 확인](https://user-images.githubusercontent.com/82688516/210493138-69fffd6c-ae3a-4884-b40a-71f9a31a5350.gif)



## 👪 구성원 역할
<br />

| 이름 | 역할 | 구현 기능 | 
| ------ | ------ | ------ |
|  김재영   |  프론트엔드(팀장)   | MyPage   |
|  정승우   |  프론트엔드,백엔드   | AdminPage  |
|  최정훈   |  프론트엔드   | Reservation  |
|  박우람   |  프론트엔드   | Main, Login  |
|  김채홍   |  백엔드   |  Backend API  |

