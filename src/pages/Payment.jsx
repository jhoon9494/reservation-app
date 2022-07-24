import { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReserveRoomInfo from '../components/ReserveRoomInfo';
import ReserveUserInfo from '../components/ReserveUserInfo';
import ReservePrice from '../components/ReservePrice';
import PaymentTypes from '../components/PaymentTypes';
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

  const data = sessionStorage.getItem('reserveData');
  const roomData = JSON.parse(data);

  const handlePayment = async () => {
    const reserveData = {
      startDate: moment(roomData.startDate)._d,
      endDate: moment(roomData.endDate)._d,
      name: userInfo.name,
      roomID: roomData.roomID,
      peopleNumber: roomData.people,
      requirements: userInfo.require,
      price: roomData.price,
      email: userInfo.email,
      phoneNumber: [
        userInfo.startPhoneNumber,
        userInfo.midPhoneNumber,
        userInfo.endPhoneNumber,
      ].join('-'),
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/api/booking/create',
        JSON.stringify(reserveData)
      );
      if (res.status === 201) {
        return alert('예약이 완료되었습니다!');
      }
      if (res.status === 400) {
        return alert(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <Title>결제하기</Title>
      <Container>
        <LeftContainer>
          {/* 예약 상품 정보 */}
          <ContentBox>
            <ReserveRoomInfo roomData={roomData} />
          </ContentBox>
          {/* 예약자 정보 */}
          <ContentBox>
            <ReserveUserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
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
          <ContentBox>
            <PaymentTypes />
          </ContentBox>
          <PaymentButton onClick={handlePayment}>결제하기</PaymentButton>
        </RightContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Payment;

// 공용 스타일 컴포넌트
const Title = styled.h1`
  text-align: center;
  font-size: ${baseStyle.titleFontSize};
  margin-top: 35px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;

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
  margin-top: 24px;
  padding: 0.5rem;
  background-color: ${baseStyle.mainColor};
`;
