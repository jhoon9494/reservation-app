import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import baseStyle from '../styles/baseStyle';

const MypageModal = (props) => {
  // console.log(props);
  // modalShow : modal창 true값으로 받고 창 뜸,
  // setModalShow : modal창 false로 만들고 닫기 위함
  // modalSelect : modal클릭한 종류, width,height, room값이 들어있음
  const { modalShow, setModalShow, modalSelect, setCheckPw } = props;

  // modal option값에 따라 창 다르게 띄워주기
  const viewContent = () => {
    // console.log('modalSelect :', modalSelect);
    switch (modalSelect.option) {
      // 예약조회 창
      case 'ModalReservationCancellation':
        return (
          <ModalReservationCancellation>
            <ContentReservationCancellation
              room={modalSelect.room}
              bookingid={modalSelect.bookingid}
              setModalShow={setModalShow}
            />
          </ModalReservationCancellation>
        );
      // 후기작성 창
      case 'ModalWriteReview':
        return (
          <ModalWriteReview>
            <ContentWriteReview
              setModalShow={setModalShow}
              bookingid={modalSelect.bookingid}
              roomid={modalSelect.roomid}
              userName={modalSelect.userName}
            />
          </ModalWriteReview>
        );
      // 후기수정 창
      case 'ModalModifiedReview':
        return (
          <ModalModifiedReview>
            <ContentModifiedReview
              setModalShow={setModalShow}
              bookingid={modalSelect.bookingid}
            />
          </ModalModifiedReview>
        );
      // 정보수정 비번확인 창
      case 'ModalCheckPassword':
        return (
          <ModalCheckPassword>
            <ContentCheckPassword
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
      color: ${baseStyle.mainColor};
      background-color: transparent;
      border: 1px solid ${baseStyle.mainColor};
    }
    .cancelBtn {
      color: #ffffff;
      border: 1px solid ${baseStyle.mainColor};
      background: ${baseStyle.mainColor};
      margin-left: 46px;
    }
  }
`;

// 예약 취소 요청
const ContentReservationCancellation = (props) => {
  // console.log('content props:', props);
  const reservationCancellationRequest = async () => {
    // console.log('취소요청보냄', props.bookingid);

    try {
      const reservationCancelUrl = `http://localhost:5000/api/booking/cancel`;
      const token = sessionStorage.getItem('token');
      // console.log(
      //   'json형태 : ',
      //   token,
      //   JSON.stringify({
      //     bookingID: props.bookingid,
      //   })
      // );
      const body = {
        bookingID: props.bookingid,
      };

      const config = {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.patch(reservationCancelUrl, JSON.stringify(body), config);
      alert('취소 신청이 되었습니다.');
      props.setModalShow();
      // console.log('취소가 되었습니다:', res);
    } catch (err) {
      alert(err.response.data.reason);
      props.setModalShow();
    }
  };
  return (
    <>
      <h2>{props.room}를 예약 취소하겠습니까?</h2>
      <h3>환불규정</h3>
      <p>환불규정은 시즌과 상관없이 동일하게 적용됩니다.</p>
      <p>1일 전 취소 : 0% 환불</p>
      <p>2일 전 취소 : 30% 환불</p>
      <p>5일 전 취소 : 100% 환불</p>
      <div>
        <button className="checkBtn" onClick={reservationCancellationRequest}>
          확인
        </button>
        <button className="cancelBtn" onClick={() => props.setModalShow()}>
          취소
        </button>
      </div>
    </>
  );
};

// 후기 작성 창과 내용 제어
const ModalWriteReview = styled.section`
  padding: 60px 80px;
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
      color: ${baseStyle.mainColor};
      background-color: transparent;
      border: 1px solid ${baseStyle.mainColor};
    }
    .cancelBtn {
      color: #ffffff;
      border : 1px solid ${baseStyle.mainColor};
      background: ${baseStyle.mainColor};
      margin-left: 100px;
    }
  }
`;

// 후기 작성 요청
const ContentWriteReview = (props) => {
  // console.log('createReviewContent : ', props);
  const [grade, setGrade] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createReviewContent = async () => {
    // console.log('createReviewContent');
    try {
      // 빈 공란 경고메세지
      if (!title) return alert('제목을 입력해주세요.');
      if (!grade) return alert('점수를 선택해주세요.');
      if (!content) return alert('내용을 입력해주세요.');

      // 리뷰 작성 요청하는 api
      const loadReviewUrl = `http://localhost:5000/api/review/create`;

      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      };
      const body = {
        bookingID: props.bookingid,
        roomID: props.roomid,
        name: props.userName,
        grade: grade,
        title: title,
        content: content,
      };

      // console.log('json 형태 : ', token, JSON.stringify(body));
      await axios.post(loadReviewUrl, JSON.stringify(body), config);
      await changeReviewState();

      // console.log('리뷰 작성 완료', res);
    } catch (err) {
      alert(err.response.data.reason);
      props.setModalShow();
    }
  };

  //리뷰 상태 변경하는 요청
  const changeReviewState = async () => {
    try {
      const changeReviewStateUrl = `http://localhost:5000/api/booking/review`;
      const config = {
        headers: {
          'Content-Type': `application/json`,
        },
      };
      await axios.patch(
        changeReviewStateUrl,
        JSON.stringify({ bookingID: props.bookingid }),
        config
      );

      await alert('후기 작성 되었습니다.');
      // console.log('리뷰 상태 변경 완료', res);
    } catch (err) {
      alert(err.response.data.reason);
      props.setModalShow();
    }
  };

  return (
    <>
      <h2>후기 작성를 작성하세요</h2>
      <div className="titleLine">
        <label>제목 :</label>
        <input
          type="text"
          placeholder=" 제목을 입력해주세요."
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <select onChange={(e) => setGrade(parseInt(e.target.value))}>
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
          placeholder="100자 내외로 내용을 입력해주세요."
          rows="4"
          maxLength="100"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="btnLine">
        <button className="checkBtn" onClick={() => props.setModalShow()}>
          취소
        </button>
        <button className="cancelBtn" onClick={createReviewContent}>
          확인
        </button>
      </div>
    </>
  );
};

// 후기 수정 창과 내용 제어
const ModalModifiedReview = styled.section`
  padding: 60px 80px;
  display: flex;
  flex-direction: column;
  align-items: stretch

  font-family: 'Noto Sans KR';
  font-size: 14px;
  line-height: 21px;
  & section {
    padding:0px;

  }

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
      color: ${baseStyle.mainColor};
      background-color: transparent;
      border: 1px solid ${baseStyle.mainColor};
    }
    .cancelBtn {
      color: #ffffff;
      border : 1px solid ${baseStyle.mainColor};
      background: ${baseStyle.mainColor};
      margin-left: 100px;
    }
  }
`;

// 후기 수정
const ContentModifiedReview = (props) => {
  // console.log('후기수정 :', props.bookingid);
  // const grade = loadReview.grade;
  const grade = 5;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loadReview, setLoadReview] = useState({});

  useEffect(() => {
    // 후기 조회 요청
    const loadReviewContent = async () => {
      // console.log('loadReviewContent');
      // console.log(setLoadReview);
      try {
        const loadReviewUrl = `http://localhost:5000/api/review/booking?bookingID=${props.bookingid}`;

        const res = await axios.get(loadReviewUrl);
        // console.log('loadReview 로드완료', res);
        await setLoadReview({ ...res.data });
        await setTitle(res.data.title);
        await setContent(res.data.content);

        // console.log('loadReview 로드완료', loadReview);
      } catch (err) {
        alert(err.response.data.reason);
        props.setModalShow();
      }
    };
    loadReviewContent();
  }, []);

  // 후기 수정 후 작성 요청
  const editReviewContent = async () => {
    // console.log('editReviewContent');
    // console.log('loadReview._id:', loadReview._id);
    try {
      // 빈 공란 경고메세지
      if (!title) return alert('제목을 입력해주세요.');
      if (!content) return alert('내용을 입력해주세요.');

      // 요청하는 api
      const editReviewUrl = `http://localhost:5000/api/review/${loadReview._id}`;
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      };
      const body = {
        grade: grade,
        title: title,
        content: content,
      };
      // console.log('json보내는 형식 : ', token, JSON.stringify(body));

      await axios.patch(editReviewUrl, JSON.stringify(body), config);
      alert('후기 수정을 완료했습니다.');
      // console.log('리뷰 수정 작성 완료', res);
      props.setModalShow();
    } catch (err) {
      alert(err.response.data.reason);
      props.setModalShow();
    }
  };

  return (
    <>
      <ModalModifiedReview>
        <h2>후기 수정을 작성하세요</h2>
        <div className="titleLine">
          <label>제목 :</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <select disabled>
            <option value={grade}>{grade}</option>
          </select>
        </div>
        <div className="contentsLine">
          <label>내용 :</label>
          <textarea
            type="textarea"
            rows="4"
            maxLength="100"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </div>
        <div className="btnLine">
          <button className="checkBtn" onClick={() => props.setModalShow()}>
            취소
          </button>
          <button className="cancelBtn" onClick={editReviewContent}>
            확인
          </button>
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
  border: 1px solid ${baseStyle.mainColor};
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
  border: 1px solid ${baseStyle.mainColor};
  border-radius: 50px;
  color: #ffffff;
  background: ${baseStyle.mainColor};
  margin: auto;
}
`;

// 비번 검증 모달창
const ContentCheckPassword = (props) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // 비번 검증
  const checkedPw = () => {
    async function confirmUserPw(confirmPassword) {
      try {
        const confirmUrl = `http://localhost:5000/api/confirmPW?password=${confirmPassword}`;
        const token = sessionStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.get(confirmUrl, config);
      } catch (err) {
        props.setCheckPw(false);
        props.setModalShow(false);
        alert(err.response.data.reason);
        navigate('/');
      }
    }
    confirmUserPw(confirmPassword);

    // true = confirmUserPw(confirmPassword)
    // 비번 검증에 따라 모달창 바로 닫힘
    props.setCheckPw(true);
    props.setModalShow(false);
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
