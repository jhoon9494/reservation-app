import { useState } from 'react';
import styled from 'styled-components';

const MypageModal = (props) => {
  // console.log(props);
  // modalShow : modal창 true값으로 받고 창 뜸,
  // setModalShow : modal창 false로 만들고 닫기 위함
  // modalSelect : modal클릭한 종류, width,height, room값이 들어있음
  const { modalShow, setModalShow, modalSelect, setCheckPw } = props;

  // modal option값에 따라 창 다르게 띄워주기
  const viewContent = () => {
    // console.log('modalSelect :', props.modalSelect);
    switch (modalSelect.option) {
      // 예약조회 창
      case 'ModalReservationCancellation':
        return (
          <ModalReservationCancellation>
            <ContentReservationCancellation
              room={modalSelect.room}
              setModalShow={setModalShow}
            />
          </ModalReservationCancellation>
        );
      // 후기작성 창
      case 'ModalWriteReview':
        return (
          <ModalWriteReview>
            <ContentWriteReview setModalShow={setModalShow} />
          </ModalWriteReview>
        );
      // 후기수정 창
      case 'ModalModifiedReview':
        return (
          <ModalModifiedReview>
            <ContentModifiedReview setModalShow={setModalShow} />
          </ModalModifiedReview>
        );
      // 정보수정 비번확인 창
      case 'ModalCheckPassword':
        return (
          <ModalCheckPassword>
            <ContentCheckPassword
              userPw={modalSelect.userPw}
              setModalShow={setModalShow}
              setCheckPw={setCheckPw}
            />
          </ModalCheckPassword>
        );

      default:
        break;
    }
  };

  return (
    <>
      <ModalBackground show={modalShow} onClick={setModalShow} />
      {modalShow ? (
        <ModalContainer
          width={props.modalSelect.width}
          height={props.modalSelect.height}
        >
          {viewContent()}
        </ModalContainer>
      ) : null}
    </>
  );
};

export default MypageModal;

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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  z-index: 999;

  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 8px;
  background-color: #fff;
`;

// 예약 조회 창과 내용 제어
const ModalReservationCancellation = styled.section`
  padding: 30px;
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

const ContentReservationCancellation = (props) => {
  // console.log(props);
  return (
    <>
      <h2>{props.room}를 예약 취소하겠습니까?</h2>
      <h3>환불규정</h3>
      <p>환불규정은 시즌과 상관없이 동일하게 적용됩니다.</p>
      <p>1일 전 취소 : 0% 환불</p>
      <p>2일 전 취소 : 30% 환불</p>
      <p>5일 전 취소 : 100% 환불</p>
      <div>
        <button className="checkBtn">확인</button>
        <button className="cancelBtn" onClick={() => props.setModalShow()}>
          취소
        </button>
      </div>
    </>
  );
};

// 후기 작성 창과 내용 제어
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
      margin-left: 20px;
      border: 1px solid #000000;
      border-radius: 10px;
    }

    & input {
      margin-right:20px;
      width: 306px;
      height: 38px;
    }

    &.contentsLine {
      display:flex;
      align-items: flex-start;
    }
    & textarea {
      width: 475px;
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
      margin-left: 100px;
    }
  }
`;

const ContentWriteReview = (props) => {
  return (
    <>
      <h2>후기 작성를 작성하세요</h2>
      <div className="titleLine">
        <label>제목 :</label>
        <input type="text" placeholder=" 제목을 입력해주세요."></input>
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
        <button className="checkBtn" onClick={() => props.setModalShow()}>
          취소
        </button>
        <button className="cancelBtn">확인</button>
      </div>
    </>
  );
};

// 후기 수정 창과 내용 제어
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
      margin-right:20px;
      width: 306px;
      height: 38px;
    }

    &.contentsLine {
      display:flex;
      align-items: flex-start;
    }
    & textarea {
      width: 475px;
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
      margin-left: 100px;
    }
  }
`;

const ContentModifiedReview = (props) => {
  return (
    <>
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
          <button className="checkBtn" onClick={() => props.setModalShow()}>
            취소
          </button>
          <button className="cancelBtn">확인</button>
        </div>
      </ModalModifiedReview>
    </>
  );
};

// 정보수정 비밀번호확인 창과 내용 제어
const ModalCheckPassword = styled.section`
padding: 25px;
display: flex;
flex-direction: column;
align-items: center

font-family: 'Noto Sans KR';
font-weight: bold;
font-size: 20px;
line-height: 30px;
text-align: center;

& input {
  margin: 50px auto 55px;
  border: 1px solid #000000;
  border-radius: 10px;
  width: 306px;
  height: 38px;
}

.checkBtn {
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  
  width: 142px;
  height: 36px;
  border-radius: 50px;
  color: #ffffff;
  background: #524fa1;
  margin: auto;
}
`;

const ContentCheckPassword = (props) => {
  const [confirmPassword, setConfirmPassword] = useState('');

  // 비번 검증
  const checkedPw = () => {
    if (confirmPassword === props.userPw) {
      props.setCheckPw(true);
      props.setModalShow(false);
    } else {
      alert('비밀번호가 틀렸습니다.');
      props.setCheckPw(false);
      props.setModalShow(false);
    }
  };

  return (
    <>
      <h2>현재 비밀번호 확인</h2>
      <input
        type="password"
        value={confirmPassword || ''}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 입력하세요."
      />
      <button className="checkBtn" onClick={checkedPw}>
        확인
      </button>
    </>
  );
};
