import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';

const withCredentials = {
  headers: {
    'Content-Type': `application/json`,
  },
  withCredentials: true,
};

const MypageModifyMemberInfo = () => {
  const [getUser, setGetUser] = useState({});
  // console.log('getUser : ', getUser);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkPhoneNumForm, setCheckPhoneNumForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('회원정보 불러옴');

    async function fetchUser() {
      try {
        const urlUser = `http://localhost:5000/api/user`;
        // const token = sessionStorage.getItem('token');
        // const config = { headers: { Authorization: `Bearer ${token}` } };
        // const res = await axios.get(urlUser, config);

        const res = await axios.get(urlUser, withCredentials);

        setGetUser({ ...res.data });
        setName(res.data.name);
        setPhoneNumber(res.data.phoneNumber);
        // console.log(getUser);
      } catch (err) {
        alert(err);
      }
    }
    fetchUser();
  }, []);

  // 회원 정보 수정 요청
  const handleSubmit = async (event) => {
    event.preventDefault();

    setCheckPhoneNumForm(phoneNumberFormatVerification.test(phoneNumber));
    if (!checkPhoneNumForm) return alert('휴대폰 번호 형식이 맞지않습니다.');
    if (phoneNumber.length < 13)
      return alert('휴대폰 번호 형식이 맞지않습니다.');

    try {
      const editUserUrl = `http://localhost:5000/api/user`;
      // const token = sessionStorage.getItem('token');
      // const config = {
      //   headers: {
      //     'Content-Type': `application/json`,
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      let body = {
        name: name.length < 1 ? getUser.name : name,
        phoneNumber: phoneNumber,
      };

      if (password.length >= 1) {
        body.password = password;
      }

      console.log('body', body);

      const res = await axios.patch(
        editUserUrl,
        JSON.stringify(body),
        withCredentials
      );

      // await axios.patch(editUserUrl, JSON.stringify(body), config);
      console.log(res);
      alert('회원 정보가 업데이트 되었습니다..');
      // navigate('/');
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  // 회원탈퇴 요청
  const handleMembershipWithdrawalSubmit = async (event) => {
    event.preventDefault();

    try {
      const deleteUserUrl = `http://localhost:5000/api/user`;
      // const token = sessionStorage.getItem('token');
      // const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.delete(deleteUserUrl, withCredentials);
      // await axios.delete(deleteUserUrl, config);
      // console.log('삭제되었습니다.:', res);
      alert('회원 탈퇴 되었습니다.');
      // sessionStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      alert(err.response.data.reason);
      navigate('/');
    }
  };

  // 폰 번호 형식 검증하기 위함
  const phoneNumberFormatVerification = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;

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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>전화번호</label>
      <input
        name="phoneNumber"
        type="text"
        value={phoneNumber}
        maxLength={13}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          setCheckPhoneNumForm(
            phoneNumberFormatVerification.test(e.target.value)
          );
        }}
      />
      <div>{checkPhoneNumForm ? '' : '000-0000-0000으로 입력해주세요.'}</div>
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
      background: rgba(169, 187, 210, 0.7);
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
  border: 3px solid ${baseStyle.mainColor};
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
    color: ${baseStyle.disableColor};
    background-color: transparent;
    border: 1px solid transparent;
  }
`;
