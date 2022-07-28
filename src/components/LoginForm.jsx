import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
  const { close } = props;

  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      autoLogin: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('이메일 형식으로 입력해주세요.')
        .required('이메일 주소를 입력해주세요.'),
      password: Yup.string().required('비밀번호를 입력해주세요.'),
    }),
    onSubmit: async (values) => {
      try {
        setError('');
        const { email, password, autoLogin } = values;
        await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/login`,
          {
            email,
            password,
            autoLogin,
          },
          { withCredentials: true }
        );
        alert('로그인 되었습니다.');
        close();
      } catch (error) {
        alert(error.response.data.reason);
      }
    },
  });

  return (
    <ModalForm onSubmit={formik.handleSubmit}>
      <ModalTitle>로그인</ModalTitle>
      <Input
        id="email"
        type="text"
        placeholder="이메일"
        {...formik.getFieldProps('email')}
      />
      {formik.touched.email && formik.errors.email ? (
        <InputErrorMessage>{formik.errors.email}</InputErrorMessage>
      ) : null}
      <Input
        name="password"
        type="password"
        placeholder="비밀번호"
        {...formik.getFieldProps('password')}
      />
      {formik.touched.password && formik.errors.password ? (
        <InputErrorMessage>{formik.errors.password}</InputErrorMessage>
      ) : null}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <SubmitButton type="submit">로그인</SubmitButton>
      <Line />
      <KakaoLoginButton
        href={`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/kakao`}
      >
        <KakaoIcon src="images/kakao-icon.png" />
        카카오 로그인
      </KakaoLoginButton>
      <EtcWrap>
        <AutoLoginWrap>
          <AutoLoginCheck
            id="autoLogin"
            type="checkbox"
            onChange={(value) => {
              if (value.target.checked) {
                alert(
                  '공공장소에서 이용하실 경우 아이디가 도용될 우려가 있으니 조심해주시길 바랍니다.'
                );
              }
              formik.handleChange(value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.autoLogin}
          />
          <AutoLoginLabel htmlFor="autoLogin">자동 로그인</AutoLoginLabel>
        </AutoLoginWrap>
        <StyledLink to="/findAccount" onClick={close}>
          이메일 찾기 / 비밀번호 찾기
        </StyledLink>
      </EtcWrap>
    </ModalForm>
  );
};

export default LoginForm;

const ModalForm = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0 2rem;
`;

const Input = styled.input`
  height: 2.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  border: 0;
  border-radius: 0.5rem;
  outline: none;
  padding-left: 1rem;
  background-color: rgb(233, 233, 233);

  & + & {
    margin-top: 1rem;
  }
`;

const InputErrorMessage = styled.div`
  margin: 0.25rem;
  font-size: 0.8rem;
  color: red;
`;

const ErrorMessage = styled.div`
  margin: 0.25rem;
  font-size: 0.8rem;
  color: red;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin: 2rem 0 1rem;
  padding: 0.5rem;
  background-color: ${baseStyle.mainColor};

  &:hover {
    background-color: ${baseStyle.mainColor};
  }
`;

const Line = styled.div`
  height: 0;
  border-bottom: 1px solid rgb(233, 233, 233);
`;

const KakaoLoginButton = styled(Button)`
  width: 100%;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: rgba(254, 229, 0, 1);
  color: #191919;
  border: 1px solid rgba(254, 229, 0, 1);
  font-weight: bold;

  &:hover {
    color: #191919;
    background-color: rgba(254, 229, 0, 1);
    border: 1px solid rgba(254, 229, 0, 1);
  }
`;

const KakaoIcon = styled.img`
  width: 1.5rem;
  margin-right: 0.25rem;
`;

const EtcWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const AutoLoginWrap = styled.div`
  display: flex;
  align-items: center;
`;

const AutoLoginCheck = styled.input``;

const AutoLoginLabel = styled.label`
  padding-left: 0.25rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${baseStyle.navbarColor};
  transition: color 0.5s;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
    color: ${baseStyle.navbarHoverColor};
  }
`;
