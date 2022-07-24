import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';

const MypageModifyMemberInfo = (props) => {
  const getUser = props.getUser;
  // console.log('getUser', getUser);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(getUser.name);
  const [phoneNumber, setPhoneNumber] = useState(getUser.phoneNumber);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!phoneNumberFormatVerification.test(phoneNumber))
      return alert('휴대폰 번호 형식이 맞지않습니다.');

    try {
      const deleteUserUrl = `http://localhost:5000/api/user`;
      const token = sessionStorage.getItem('token');
      console.log('token', token);
      const config = { headers: { Authorization: `Bearer ${token}` } };

      let body = {
        name: name,
        password: password,
        phoneNumber: phoneNumber,
      };
      //비번이 공란일시 이전 비번을 업데이트 시켜줌
      if (password === '') body.password = getUser.password;

      console.log(body);
      const res = await axios.patch(
        deleteUserUrl,
        config,
        JSON.stringify(body)
      );

      alert('회원 정보가 업데이트 되었습니다..');
      console.log('회원정보를 업데이트함:', res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMembershipWithdrawalSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    console.log('회원탈퇴 클릭시 api에 요청해서 회원 삭제');
    try {
      const deleteUserUrl = `http://localhost:5000/api/user`;
      const token = sessionStorage.getItem('token');
      console.log('token', token);

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.delete(deleteUserUrl, config);
      alert('회원 탈퇴 되었습니다.');
      console.log('삭제되었습니다.:', res);
    } catch (err) {
      console.log(err);
    }
  };

  // 폰 번호 형식 검증하기 위함
  const phoneNumberFormatVerification = /^[0-9]{3}-[0-9]{4}-[0-9]{4}/;

  return (
    <Form onSubmit={handleSubmit}>
      <label>이메일</label>
      <input name="email" type="email" placeholder={getUser.email} disabled />
      <div></div>
      <label>신규비밀번호</label>
      <input
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        {password.length + 1 <= 8 && password.length > 0
          ? '비밀번호를 8자리 이상 입력해야합니다.'
          : ''}
      </div>
      <label>신규비밀번호 확인</label>
      <input
        name="confirmPassword"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={password.length + 1 <= 8}
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
        name="phoneNumber"
        type="text"
        placeholder={getUser.phoneNumber}
        value={phoneNumber || ''}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        {phoneNumberFormatVerification.test(phoneNumber)
          ? ''
          : '000-0000-0000으로 입력해주세요.'}
      </div>
      <WithdrawalButton onClick={handleMembershipWithdrawalSubmit}>
        회원탈퇴
      </WithdrawalButton>
      <SubmitButton type="submit" disabled={password !== confirmPassword}>
        확인
      </SubmitButton>
    </Form>
  );
};

export default MypageModifyMemberInfo;
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
