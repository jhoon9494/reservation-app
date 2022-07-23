import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import baseStyle from '../styles/baseStyle';
import { Button } from 'react-bootstrap';

const Payment = () => {
  return (
    <>
      <Navbar />
      <Title>결제하기</Title>
      <Container>
        <LeftContainer>
          {/* 예약 상품 정보 */}
          <ContentBox>
            <h2>예약 상품 정보</h2>
            <RoomBox>
              <RoomImg src={null} alt={'temp'} />
              <RoomInfo>
                <p>C-101호</p>
                <p>인원 : 4인</p>
                <p>일정 : 2022.08.12 ~ 22.08.14</p>
              </RoomInfo>
            </RoomBox>
          </ContentBox>
          {/* 예약자 정보 */}
          <ContentBox>
            <Header>
              <h2>예약자 정보</h2>
              <input
                type={'checkbox'}
                onChange={() => console.log('checked')}
              />
              <span>주문자와 동일</span>
            </Header>
            <UserInfo>
              <input
                type={'text'}
                placeholder={'예약자명'}
                style={{ width: '100px' }}
              />
              <div style={{ marginBottom: '9px' }}>
                <input
                  type={'number'}
                  defaultValue={'010'}
                  style={{
                    width: '70px',
                    border: 'none',
                    background: 'lightgray',
                    padding: '2px 10px',
                  }}
                />
                <span> - </span>
                <input
                  type={'number'}
                  style={{
                    width: '100px',
                    border: 'none',
                    background: 'lightgray',
                    padding: '2px 10px',
                  }}
                />
                <span> - </span>
                <input
                  type={'number'}
                  style={{
                    width: '100px',
                    border: 'none',
                    background: 'lightgray',
                    padding: '2px 10px',
                  }}
                />
              </div>
              <input type={'text'} placeholder={'이메일'} />
              <input
                type={'textarea'}
                placeholder={'요청사항'}
                style={{ height: '60px' }}
              />
            </UserInfo>
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
            <PriceContainer>
              <h2>최종 결제 금액</h2>
              <div>상품 금액 : 100,000원</div>
              <div>총 숙박일 : 2박</div>
              <hr />
              <div>총 결제 금액 : 200,000원</div>
            </PriceContainer>
          </ContentBox>
          <ContentBox>
            <h2>결제 수단</h2>
            <input type={'checkbox'} />
            <span>무통장 입금</span>
          </ContentBox>
          <SubmitButton>결제하기</SubmitButton>
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
    margin: 0;
  }

  &:not(:first-child) {
    margin-top: 24px;
  }
`;

// 예약 상품 정보
const RoomBox = styled.div`
  display: flex;
  margin-top: 13px;
`;

const RoomImg = styled.img`
  display: block;
  width: 87px;
  height: 87px;
  border: 1px solid black;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 9px;

  > p {
    padding: 5px;
    margin: 0;
    font-size: ${baseStyle.contentFontSize};
  }
`;

// 예약자 정보
const Header = styled.div`
  display: flex;
  > input {
    margin-left: 20px;
    width: 18px;
  }

  > span {
    margin-left: 10px;
    font-size: ${baseStyle.contentFontSize};
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 9px;

  > input {
    border: none;
    background-color: lightgray;
    margin-bottom: 9px;
    padding: 2px 10px;
  }
`;

// 최종 결제금액
const PriceContainer = styled.div``;

// 결제하기 버튼
const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 24px;
  padding: 0.5rem;
  background-color: ${baseStyle.mainColor};
`;
