import { useState } from 'react';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import axios from 'axios';

const ReserveUserInfo = ({ userInfo, setUserInfo }) => {
  const [orderCheck, setOrderCheck] = useState(false);

  const handleOrderCheckbox = async () => {
    if (!orderCheck) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/user`,
          {
            withCredentials: true,
          }
        );
        const { name, email } = res.data;
        if (res.data.provider) {
          setUserInfo((prev) => ({
            ...prev,
            name,
            email: '',
            startPhoneNumber: '010',
            midPhoneNumber: '',
            endPhoneNumber: '',
          }));
        } else {
          const phoneNumberArray = res.data.phoneNumber.split('-');
          setUserInfo((prev) => ({
            ...prev,
            name,
            email,
            startPhoneNumber: phoneNumberArray[0],
            midPhoneNumber: phoneNumberArray[1],
            endPhoneNumber: phoneNumberArray[2],
          }));
        }
      } catch (e) {
        alert(e.response.data.reason);
      }
    } else {
      setUserInfo({
        name: '',
        startPhoneNumber: '010',
        midPhoneNumber: '',
        endPhoneNumber: '',
        email: '',
        require: '',
      });
    }
    setOrderCheck((bool) => !bool);
  };

  const handleUserInfo = (e, key) => {
    setUserInfo((prevDate) => ({ ...prevDate, [key]: e.target.value }));
  };
  return (
    <>
      <Header>
        <h2 style={{ margin: '0' }}>예약자 정보</h2>
        <input
          type={'checkbox'}
          onChange={handleOrderCheckbox}
          checked={orderCheck}
        />
        <span>주문자와 동일</span>
      </Header>
      <UserInfo>
        <Label htmlFor="userName">
          <span>예약자명</span>
          <UserInput
            type={'text'}
            id={'userName'}
            width={'150px'}
            placeholder={'예약자명'}
            onChange={() => handleUserInfo(event, 'name')}
            value={userInfo.name}
          />
        </Label>
        <Label htmlFor="phoneNumber">
          <span>휴대전화</span>
          <div>
            <UserInput
              type={'number'}
              id={'phoneNumber'}
              width={'70px'}
              onChange={() => handleUserInfo(event, 'startPhoneNumber')}
              value={userInfo.startPhoneNumber}
            />
            <span> - </span>
            <UserInput
              type={'number'}
              width={'100px'}
              onChange={() => handleUserInfo(event, 'midPhoneNumber')}
              value={userInfo.midPhoneNumber}
            />
            <span> - </span>
            <UserInput
              type={'number'}
              width={'100px'}
              onChange={() => handleUserInfo(event, 'endPhoneNumber')}
              value={userInfo.endPhoneNumber}
            />
          </div>
        </Label>
        <Label htmlFor="email">
          <span>이메일</span>
          <UserInput
            type={'text'}
            id={'email'}
            placeholder={'이메일'}
            onChange={() => handleUserInfo(event, 'email')}
            value={userInfo.email}
          />
        </Label>
        <Label htmlFor="require">
          <span>요청사항</span>
          <UserInput
            type={'textarea'}
            id={'require'}
            placeholder={'요청사항'}
            height={'70px'}
            onChange={() => handleUserInfo(event, 'require')}
            value={userInfo.require}
          />
        </Label>
      </UserInfo>
    </>
  );
};

export default ReserveUserInfo;

const Header = styled.div`
  display: flex;
  align-items: center;

  > input {
    margin-left: 10px;
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
`;

const UserInput = styled.input`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => props.height};
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 9px;
  padding: 2px 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;

  > span {
    margin: 0 5px 5px 0;
  }
`;
