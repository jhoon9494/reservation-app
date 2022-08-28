import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReserveRoomInfo from '../components/ReserveRoomInfo';
import ReserveUserInfo from '../components/ReserveUserInfo';
import ReservePrice from '../components/ReservePrice';
import baseStyle from '../styles/baseStyle';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';

const Payment = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    startPhoneNumber: '010',
    midPhoneNumber: '',
    endPhoneNumber: '',
    email: '',
    require: '',
  });
  const [successReserve, setSuccessReserve] = useState(false);

  const data = sessionStorage.getItem('reserveData');
  const roomData = JSON.parse(data);

  const handlePayment = async () => {
    // 예약자 정보 미입력시 경고창
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.midPhoneNumber ||
      !userInfo.endPhoneNumber
    ) {
      alert('예약자 정보를 먼저 입력해주세요.');
      return;
    }

    const stayDate = moment(roomData.endDate).diff(
      moment(roomData.startDate),
      'days'
    );
    const reserveData = {
      startDate: moment(roomData.startDate)._d,
      endDate: moment(roomData.endDate)._d,
      name: userInfo.name,
      roomID: roomData.roomID,
      peopleNumber: roomData.people,
      requirements: userInfo.require,
      price: stayDate * roomData.price,
      email: userInfo.email,
      phoneNumber: [
        userInfo.startPhoneNumber,
        userInfo.midPhoneNumber,
        userInfo.endPhoneNumber,
      ].join('-'),
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/booking/create`,
        JSON.stringify(reserveData),
        {
          headers: {
            'Content-Type': `application/json`,
          },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        setSuccessReserve(true);
        return alert('예약이 완료되었습니다!');
      }
    } catch (e) {
      alert(e.response.data.reason);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {successReserve ? (
        <Container>
          <LinkContainer>
            <StyledLink to={'/'}>홈으로 가기</StyledLink>
            <StyledLink to={'/mypage'}>예약 조회하기</StyledLink>
          </LinkContainer>
        </Container>
      ) : (
        <>
          <Title>결제하기</Title>
          <Container>
            <LeftContainer>
              {/* 예약 상품 정보 */}
              <ContentBox>
                <ReserveRoomInfo roomData={roomData} />
              </ContentBox>
              {/* 예약자 정보 */}
              <ContentBox>
                <ReserveUserInfo
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
              </ContentBox>
              {/* 취소 및 환불 규정 */}
              <ContentBox>
                <h2 style={{ marginBottom: '10px' }}>취소 / 환불 규정</h2>
                <p>환불 규정은 시즌과 상관없이 동일하게 적용됩니다.</p>
                <p>1일 전 취소 : 0% 환불</p>
                <p>2일 전 취소 : 30% 환불</p>
                <p>5일 전 취소 : 100% 환불</p>
              </ContentBox>
            </LeftContainer>
            <RightContainer>
              {/* 최종 결제 금액 */}
              <ContentBox>
                <ReservePrice roomData={roomData} />
              </ContentBox>
              <PaymentButton onClick={handlePayment}>결제하기</PaymentButton>
            </RightContainer>
          </Container>
        </>
      )}
    </div>
  );
};

export default Payment;

const Title = styled.h1`
  text-align: center;
  font-size: ${baseStyle.titleFontSize};
  margin-top: 35px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  width: 466px;
  margin-top: 29px;
  margin-right: 27px;

  > div {
    box-shadow: 3px 3px 10px lightgray;
  }
`;

const RightContainer = styled.div`
  width: 325px;
  margin-top: 29px;

  > div {
    box-shadow: 3px 3px 10px lightgray;
  }

  @media (max-width: 768px) {
    width: 466px;
    margin-top: 29px;
    margin-right: 27px;
  }
`;

const ContentBox = styled.div`
  padding: 19px 16px 24px;

  h2 {
    font-size: ${baseStyle.subTitleFontSize};
    margin-bottom: 10px;
  }

  &:not(:first-child) {
    margin-top: 24px;
  }
`;

// 결제하기 버튼
const PaymentButton = styled(Button)`
  width: 100%;
  margin: 24px 0;
  padding: 0.5rem;
  background-color: ${baseStyle.mainColor};
  border: 1px solid ${baseStyle.mainColor};

  &:hover {
    background-color: ${baseStyle.mainHoverColor};
    border: 1px solid ${baseStyle.mainHoverColor};
  }
`;

// 결제 성공 후 버튼
const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20rem;
`;

const StyledLink = styled(Link)`
  border: 2px solid ${baseStyle.mainColor};
  color: ${baseStyle.mainColor};
  border-radius: 5px;
  padding: 8px 30px;
  font-size: ${baseStyle.subTitleFontSize};
  margin: 5px;

  &:hover {
    color: white;
    background-color: ${baseStyle.mainColor};
  }
`;
