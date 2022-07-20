import baseStyle from '../styles/baseStyle';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FastField } from 'formik';
// import axios from 'axios';

const MyPage = () => {
  const [getUser, setGetUser] = useState({});
  const [getBooking, setGetBooking] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // tab제어
  const [currTab, setCurrTab] = useState('정보수정');
  // modal제어
  const [modalShow, setModalShow] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [reviewModal, setReviwModal] = useState(FastField);
  const [reviewModifiedModal, setReviewModifiedModal] = useState(false);

  useEffect(() => {
    console.log('useEffect');
    const urlUser = `../../mock/userMock.json`;
    const urlBookingList = `../../mock/bookingMock.json`;
    async function fetchUser() {
      const res = await fetch(urlUser);
      const getUsers = await res.json();
      setGetUser(() => ({ ...getUsers[0] }));
    }

    async function fetchBooking() {
      const res = await fetch(urlBookingList);
      const getBookings = await res.json();
      // TODO: 해당 유저 아이디로 찾는 것 있어야함
      setGetBooking(() => [...getBookings]);
    }
    fetchUser();
    fetchBooking();
  }, []);

  // modal 창 닫기
  const closeModal = () => {
    setModalShow(false);
    setCancelModal(false);
    setReviwModal(false);
    setReviewModifiedModal(false);
  };

  // modal 창 크기 제어
  const modal = (width, height) => {
    console.log('modal실행', width, height);
    setModalShow(true);
    return;
  };

  // 버튼에 따라 modal 제어하기 위함 실험중
  const handlButton = (e) => {
    const text = e.target.innerText;
    switch (text) {
      case '예약취소':
        console.log('예약취소');
        modal(600, 405);
        setCancelModal(true);
        break;
      case '후기작성':
        console.log('후기작성');
        modal(700, 500);
        setReviwModal(true);
        break;
      case '후기수정':
        console.log('후기수정');
        setReviewModifiedModal(true);
        break;
      default:
        console.log('버튼클릭');
    }
  };

  const tabs = ['정보수정', '예약조회'];
  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };

  //TODO 탭을 나누고 각각 서로 필요한 부분을 호출해야됨
  const handleSubmit = (event) => {
    event.preventDefault();
    const inputs = {
      password: password,
      name: name,
      phone: phone,
    };
    console.log(inputs);

    console.log('회원정보를 업데이트함');
    //await axios.post(serverURL, JSON.stringify(newObj))
  };
  const handleMembershipWithdrawalSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log('회원탈퇴 클릭시 api에 요청해서 회원 삭제');
  };
  return (
    <div>
      <TabContainer>
        {tabs.map((tab, i) => {
          return (
            <EactTab
              key={`${tab}-${i}`}
              active={currTab === tab}
              onClick={() => handleClickTab(tab)}
            >
              {tab}
            </EactTab>
          );
        })}
      </TabContainer>
      {currTab === '정보수정' ? (
        <Form onSubmit={handleSubmit}>
          <label>이메일</label>
          <input
            name="email"
            type="email"
            placeholder={getUser.email}
            disabled
          />
          <div></div>
          <label>신규비밀번호</label>
          <input
            name="password"
            type="password"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            {password.length + 1 <= 4 && password.length > 0
              ? '비밀번호를 4자리 이상 입력해야합니다.'
              : ''}
          </div>
          <label>신규비밀번호 확인</label>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword || ''}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={password.length + 1 <= 4}
          ></input>
          <div>
            {password === confirmPassword ? '' : '비밀번호가 일치해야합니다'}
          </div>
          <label>이름</label>
          <input
            name="name"
            type="text"
            placeholder={getUser.name}
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
          <label>전화번호</label>
          <input
            name="phone"
            type="text"
            placeholder={getUser.phone}
            value={phone || ''}
            onChange={(e) => setPhone(e.target.value)}
          />

          <WithdrawalButton onClick={handleMembershipWithdrawalSubmit}>
            회원탈퇴
          </WithdrawalButton>
          <SubmitButton type="submit" disabled={password !== confirmPassword}>
            확인
          </SubmitButton>
        </Form>
      ) : (
        <ReservationCheckContainer>
          <SearchCheckinDateSelect>
            <SearchCheckinDateOption value="">
              [임시]달력으로 체크인날짜 검색
            </SearchCheckinDateOption>
          </SearchCheckinDateSelect>
          <BookBarContainerDiv>
            <BookBarUnderlineDiv>
              <BookBarSpan>예약기간</BookBarSpan>
              <BookBarSpan>객실명</BookBarSpan>
              <BookBarSpan>인원</BookBarSpan>
              <BookBarSpan>가격</BookBarSpan>
              <BookBarSpan>예약 상태</BookBarSpan>
              <BookBarSpan></BookBarSpan>
              <BookBarSpan></BookBarSpan>
            </BookBarUnderlineDiv>
          </BookBarContainerDiv>
          <BookListsUl>
            {getBooking.map((list, i) => {
              return (
                <BookListLi key={`${list.objectID}-${i}`}>
                  <BookListSpan>{list.bookingDate}</BookListSpan>
                  <BookListSpan>{list.RoomID}</BookListSpan>
                  <BookListSpan>{list.peopleNum}</BookListSpan>
                  <BookListSpan>{list.price}</BookListSpan>
                  <BookListSpan>{list.state}</BookListSpan>
                  <BookListSpan>
                    <BookStateBtn onClick={handlButton}>예약취소</BookStateBtn>
                  </BookListSpan>
                  <BookListSpan onClick={handlButton}>
                    <ReviewWriteBtn>후기작성</ReviewWriteBtn>
                  </BookListSpan>
                </BookListLi>
              );
            })}
          </BookListsUl>
          <ModalBackground
            show={modalShow}
            onClick={closeModal}
          ></ModalBackground>
          {modalShow ? (
            <ModalContainer>
              {cancelModal ? (
                <ModalReservationCancellation>
                  <h2>0000를 예약 취소하겠습니까?</h2>
                  <h3>환불규정</h3>
                  <p>환불규정은 시즌과 상관없이 동일하게 적용됩니다.</p>
                  <p>1일 전 취소 : 0% 환불</p>
                  <p>2일 전 취소 : 30% 환불</p>
                  <p>5일 전 취소 : 100% 환불</p>
                  <div>
                    <button className="checkBtn">확인</button>
                    <button className="cancelBtn" onClick={() => closeModal()}>
                      취소
                    </button>
                  </div>
                </ModalReservationCancellation>
              ) : (
                ''
              )}
              {reviewModal ? (
                <ModalWriteReview>
                  <h2>후기 작성를 작성하세요</h2>
                  <div className="titleLine">
                    <label>제목 :</label>
                    <input
                      type="text"
                      placeholder=" 제목을 입력해주세요."
                    ></input>
                    <select>
                      <option value="">점수 주기</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                  <div className="contentsLine">
                    <label>내용 :</label>
                    <textarea
                      type="textarea"
                      placeholder=" 내용을 입력해주세요."
                      rows="4"
                      maxLength="50"
                    ></textarea>
                  </div>
                  <div className="btnLine">
                    <button className="checkBtn" onClick={() => closeModal()}>
                      취소
                    </button>
                    <button className="cancelBtn">확인</button>
                  </div>
                </ModalWriteReview>
              ) : (
                ''
              )}

              {reviewModifiedModal ? (
                <ModalModifiedReview>
                  <h2>후기 수정을 작성하세요</h2>
                  <div className="titleLine">
                    <label>제목 :</label>
                    <input
                      type="text"
                      placeholder=" [이전내용]제목을 입력해주세요."
                    ></input>
                    <select disabled>
                      <option value="">점수 주기</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                  <div className="contentsLine">
                    <label>내용 :</label>
                    <textarea
                      type="textarea"
                      placeholder=" [이전내용]내용을 입력해주세요."
                      rows="4"
                      maxLength="50"
                    ></textarea>
                  </div>
                  <div className="btnLine">
                    <button className="checkBtn" onClick={() => closeModal()}>
                      취소
                    </button>
                    <button className="cancelBtn">확인</button>
                  </div>
                </ModalModifiedReview>
              ) : (
                ''
              )}
            </ModalContainer>
          ) : null}

          <div>페이징네이션</div>
        </ReservationCheckContainer>
      )}
    </div>
  );
};

export default MyPage;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
  width: 80%;
  margin: 0 auto;
`;

const EactTab = styled.p`
  font-size: ${baseStyle.titleFontSize};
  line-height: 30px;
  color: #000;
  padding: 16px 34px;
  margin-bottom: 0;
  cursor: pointer;
  position: relative;
  + p:before {
    content: '';
    position: absolute;
    left: -0px;
    padding: 20px 34px 20px 0;
    border-left: 1px solid #000;
  }
  ${(props) =>
    props.active &&
    css`
      color: #524fa1;
      font-weight: bold;
      background: rgba(230, 230, 230, 0.0001);
      border-bottom: 5px solid #524fa1;
      // box-shadow: inset 0px -4px 0px #524fa1;
    `}
`;

const Form = styled.form`
  margin: 90px auto;
  width: 540px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  & label {
    display: inline-block;
    width: 140px;
    font-weight: 400;
    font-size: ${baseStyle.subTitleFontSize};
    line-height: 24px;
    margin-top: 30px;
  }

  & input {
    width: 400px;
    height: 30px;
    border: 1px solid #000000;
    border-radius: 7px;
    margin-top: 30px;

    &:disabled {
      background: rgba(169, 167, 208, 0.7);
    }
  }
  & div {
    visibility: visible;
    width: 100%;
    color: #ff0000;
    padding-left: 140px;
    vertical-align: center;
  }
  & button {
    margin-top: 160px;
  }
`;

const WithdrawalButton = styled.button`
  width: 142px;
  height: 36px;
  background: transparent;
  border: 3px solid #ff0000;
  border-radius: 50px;
  font-weight: 700;
  font-size: ${baseStyle.subTitleFontSize};
  line-height: 24px;
  text-align: center;
  color: ${baseStyle.mainColor};
`;

const SubmitButton = styled.button`
  width: 142px;
  height: 36px;
  background: ${baseStyle.mainColor};
  border: 1px solid ${baseStyle.mainColor};
  border-radius: 50px;
  font-weight: 700;
  font-size: ${baseStyle.subTitleFontSize};
  line-height: 24px;
  text-align: center;
  color: #ffffff;

  &:disabled {
    background: ${baseStyle.disableColor};
    border: 1px solid ${baseStyle.disableColor};
  }
`;

const ReservationCheckContainer = styled.div`
  margin: 26px auto;
  width: 1110px;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  // align-items: center;
`;

const SearchCheckinDateSelect = styled.select`
  margin-bottom: 56px;
`;
const SearchCheckinDateOption = styled.option``;

const BookBarContainerDiv = styled.div``;
const BookBarUnderlineDiv = styled.div`
  border-bottom: 1px solid #000;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding-bottom: 10px;
`;
const BookBarSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin: auto;
  & {
    margin: auto;
  }
`;

const BookListsUl = styled.ul`
  margin-top: 15px;
  margin-bottom: 170px;
  padding-left: 0;
`;

const BookListLi = styled.li`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding-bottom: 20px;
`;

const BookListSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  margin: auto;
  & + &{
  }

  
}
`;

const BookStateBtn = styled.button`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  box-sizing: border-box;
  color: ${baseStyle.mainColor};
  background-color: transparent;
  border: 1px solid #ff0000;
  width: 100px;
  height: 30px;
`;

const ReviewWriteBtn = styled.button`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  box-sizing: border-box;
  color: #fff;
  background-color: ${baseStyle.mainColor};
  border: 1px solid ${baseStyle.mainColor};
  width: 100px;
  height: 30px;
`;

const ModalBackground = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  color: #fff;
`;
const ModalContainer = styled.div`
  ${(props) => {
    console.log(props);
  }}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  z-index: 999;

  width: 700px;
  height: 500px;
  border-radius: 8px;
  background-color: #fff;
`;

const ModalReservationCancellation = styled.section`
  padding: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: 'Noto Sans KR';
  font-size: 14px;
  line-height: 21px;

  & h2,
  h3 {
    font-size: 20px;
    font-weight: bold;
  }

  h3 {
    padding-top: 17px;
    padding-bottom: 24px;
  }

  & div {
    display: flex;
    margin-top: 38px;
    & button {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      text-align: center;

      width: 142px;
      height: 36px;
      border-radius: 50px;
    }

    .checkBtn {
      color: #000000;
      background-color: transparent;
      border: 1px solid #f90303;
    }
    .cancelBtn {
      color: #ffffff;
      background: #524fa1;
      margin-left: 46px;
    }
  }
`;
const ModalWriteReview = styled.section`
  padding: 80px;
  display: flex;
  flex-direction: column;
  align-items: stretch

  font-family: 'Noto Sans KR';
  font-size: 14px;
  line-height: 21px;

  & h2 {
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
  }

  & div {
    display: flex;
    margin-top: 38px;
    align-items: center;
    
    &.titleLine{
      & label {
        font-size: 16px;
        line-height: 24px;
      }
    }
    & select {
      width: 144px;
      height: 38px;
      border: 1px solid #000000;
      border-radius: 10px;
    }
    & input,
    textarea {
      margin-left:20px;
      border: 1px solid #000000;
      border-radius: 10px;
    }

    & input {
      margin-right:22px;
      width: 306px;
      height: 38px;
    }

    &.contentsLine {
      display:flex;
      align-items: flex-start;
    }
    & textarea {
      width: 468px;
      height: 151px;
    }

    &.btnLine{
      justify-content: center
    }
    & button {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      text-align: center;

      width: 142px;
      height: 36px;
      border-radius: 50px;
    }

    .checkBtn {
      color: #000000;
      background-color: transparent;
      border: 1px solid #f90303;
    }
    .cancelBtn {
      color: #ffffff;
      background: #524fa1;
      margin-left: 46px;
    }
  }
`;

const ModalModifiedReview = styled.section`
  padding: 80px;
  display: flex;
  flex-direction: column;
  align-items: stretch

  font-family: 'Noto Sans KR';
  font-size: 14px;
  line-height: 21px;

  & h2 {
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
  }

  & div {
    display: flex;
    margin-top: 38px;
    align-items: center;
    
    &.titleLine{
      & label {
        font-size: 16px;
        line-height: 24px;
      }
    }
    & select {
      width: 144px;
      height: 38px;
      border: 1px solid #000000;
      border-radius: 10px;
    }
    & input,
    textarea {
      margin-left:20px;
      border: 1px solid #000000;
      border-radius: 10px;
    }

    & input {
      margin-right:22px;
      width: 306px;
      height: 38px;
    }

    &.contentsLine {
      display:flex;
      align-items: flex-start;
    }
    & textarea {
      width: 468px;
      height: 151px;
    }

    &.btnLine{
      justify-content: center
    }
    & button {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      text-align: center;

      width: 142px;
      height: 36px;
      border-radius: 50px;
    }

    .checkBtn {
      color: #000000;
      background-color: transparent;
      border: 1px solid #f90303;
    }
    .cancelBtn {
      color: #ffffff;
      background: #524fa1;
      margin-left: 46px;
    }
  }
`;
