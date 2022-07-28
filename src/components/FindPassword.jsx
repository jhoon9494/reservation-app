import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Progress from './Progress';

const FindPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('이메일 형식으로 입력해주세요.')
        .required('이메일 주소를 입력해주세요.')
        .max(40, '최대 40자까지 입력 가능합니다.'),
      name: Yup.string().required('이름을 입력해주세요.'),
    }),
    onSubmit: async (values) => {
      try {
        setError('');
        setIsLoading(true);
        const { email, name } = values;
        await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/newPassword`,
          { email, name },
          { withCredentials: true }
        );
        setIsLoading(false);
        alert(
          `${name}님의 본인 확인을 위해 ${email} 주소로 비밀번호 변경 메일을 발송했습니다. 이메일을 확인해주세요.`
        );
        navigate('/');
      } catch (error) {
        setError(error.response.data);
      }
    },
  });

  return (
    <>
      {isLoading && <Progress />}
      <FindForm onSubmit={formik.handleSubmit}>
        <FindTitle>비밀번호 찾기</FindTitle>
        <InputLabel htmlFor="email">이메일 주소</InputLabel>
        <Input
          name="email"
          type="text"
          placeholder="이메일 주소"
          onChange={(value) => {
            if (error) {
              setError('');
            }
            formik.handleChange(value);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <InputErrorMessage>{formik.errors.email}</InputErrorMessage>
        ) : null}
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        <InputLabel htmlFor="name">이름</InputLabel>
        <Input
          name="name"
          type="text"
          placeholder="이름"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <InputErrorMessage>{formik.errors.name}</InputErrorMessage>
        ) : null}
        <SubmitButton type="submit">비밀번호 찾기</SubmitButton>
      </FindForm>
    </>
  );
};

export default FindPassword;

const FindForm = styled.form`
  margin: 4rem 0;
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const FindTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0 2rem;
`;

const InputLabel = styled.label`
  margin: 1rem 0.25rem 0.25rem;
`;

const Input = styled.input`
  height: 2.5rem;
  font-size: 1rem;
  border: 0;
  border-radius: 0.5rem;
  outline: none;
  padding-left: 1rem;
  background-color: rgb(233, 233, 233);
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
  margin: 2rem 0;
  padding: 0.5rem;
  background-color: ${baseStyle.mainColor};

  &:hover {
    background-color: ${baseStyle.mainColor};
  }
`;
