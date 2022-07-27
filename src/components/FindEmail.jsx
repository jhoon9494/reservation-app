import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindEmail = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('이름을 입력해주세요.'),
      phoneNumber: Yup.string()
        .required('휴대폰 번호를 입력해주세요.')
        .matches(
          /^[0-9]{3}-[0-9]{4}-[0-9]{4}/,
          '하이픈을 포함하여 13자로 입력해주세요.'
        ),
    }),
    onSubmit: async (values) => {
      try {
        setError('');
        const { name } = values;
        // TODO: 이메일 찾기 API
        // query-params에 휴대폰 번호 추가
        const findEmailInfo = await axios.get(
          'http://kdt-sw2-busan-team03.elicecoding.com:5000/api/findEmail',
          {
            params: { name },
          },
          { withCredentials: true }
        );

        alert(
          `${name}님이 가입하신 이메일 주소는 ${findEmailInfo.data} 입니다.`
        );
        navigate('/');
      } catch (error) {
        setError(error);
      }
    },
  });

  return (
    <FindForm onSubmit={formik.handleSubmit}>
      <FindTitle>이메일 찾기</FindTitle>
      <InputLabel htmlFor="name">이름</InputLabel>
      <Input
        name="name"
        type="text"
        placeholder="이름"
        onChange={(value) => {
          if (error) {
            setError('');
          }
          formik.handleChange(value);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <InputErrorMessage>{formik.errors.name}</InputErrorMessage>
      ) : null}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <InputLabel htmlFor="phoneNumber">휴대폰 번호</InputLabel>
      <Input
        name="phoneNumber"
        type="text"
        placeholder="휴대폰 번호"
        maxLength={13}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phoneNumber}
      />
      {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
        <InputErrorMessage>{formik.errors.phoneNumber}</InputErrorMessage>
      ) : null}
      <SubmitButton type="submit">이메일 찾기</SubmitButton>
    </FindForm>
  );
};

export default FindEmail;

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
