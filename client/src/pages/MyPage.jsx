// import baseStyle from '../styles/baseStyle';

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e);
  console.log('data를 업데이트 시켜야함');
};
const handleMembershipWithdrawalSubmit = (e) => {
  e.preventDefault();
  console.log(e);
  console.log('회원탈퇴 클릭시 api에 요청해서 회원 삭제');
};

//TODO: PLACE HOLDER에는 사용자 정보를 받아서 입력해야함
//TODO: 탭을 나누고 각각 서로 필요한 부분을 호출해야됨

const MyPage = () => {
  return (
    <div>
      <div>정보수정 예약조회</div>
      <div>
        <form onSubmit={handleSubmit}>
          <p>email</p>
          <input type="email" placeholder="sample@naver.com" />
          <p>신규 비밀번호</p>
          <input type="password" />
          <p>신규 비밀전호 확인</p>
          <input type="password" />
          <p>이름</p>
          <input type="text" placeholder="김보라" />
          <p>전화번호</p>
          <input type="text" placeholder="010-4567-8765" />

          <button onClick={handleMembershipWithdrawalSubmit}>회원탈퇴</button>
          <button type="submit">확인</button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
