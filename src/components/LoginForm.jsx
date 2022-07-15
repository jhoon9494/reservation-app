import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('이메일 형식으로 입력해주세요.')
        .required('이메일 주소를 입력해주세요.'),
      password: Yup.string().required('비밀번호를 입력해주세요.'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
      <SubmitButton type="submit">로그인</SubmitButton>
      <Line />
      <KakaoLoginButton>
        <KakaoIcon src="images/kakao-icon.png" />
        카카오 로그인
      </KakaoLoginButton>
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
  margin: 1rem 0 2rem;
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
