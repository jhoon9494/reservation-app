import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('이메일 형식으로 입력해주세요.')
        .required('이메일 주소를 입력해주세요.')
        .max(40, '최대 40자까지 입력 가능합니다.'),
      password: Yup.string()
        .required('비밀번호를 입력해주세요.')
        .min(8, '비밀번호는 최소 8자, 최대 20자로 입력해주세요.')
        .max(20, '비밀번호는 최소 8자, 최대 20자로 입력해주세요.'),
      passwordConfirm: Yup.string()
        .required('비밀번호를 입력해주세요.')
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
      name: Yup.string()
        .required('이름을 입력해주세요.')
        .min(2, '이름은 최소 2자, 최대 10자로 입력해주세요')
        .max(10, '이름은 최소 2자, 최대 10자로 입력해주세요'),
      phone: Yup.string()
        .required('휴대폰 번호를 입력해주세요.')
        .matches(
          /^[0-9]{3}-[0-9]{4}-[0-9]{4}/,
          '하이픈을 포함하여 13자로 입력해주세요.'
        ),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <ModalForm onSubmit={formik.handleSubmit}>
      <ModalTitle>회원가입</ModalTitle>
      <InputLabel htmlFor="email">이메일</InputLabel>
      <Input
        id="email"
        type="text"
        placeholder="이메일"
        {...formik.getFieldProps('email')}
      />
      {formik.touched.email && formik.errors.email ? (
        <InputErrorMessage>{formik.errors.email}</InputErrorMessage>
      ) : null}
      <InputLabel htmlFor="password">비밀번호</InputLabel>
      <Input
        name="password"
        type="password"
        placeholder="비밀번호"
        {...formik.getFieldProps('password')}
      />
      {formik.touched.password && formik.errors.password ? (
        <InputErrorMessage>{formik.errors.password}</InputErrorMessage>
      ) : null}
      <InputLabel htmlFor="passwordConfirm">비밀번호 확인</InputLabel>
      <Input
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        {...formik.getFieldProps('passwordConfirm')}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
        <InputErrorMessage>{formik.errors.passwordConfirm}</InputErrorMessage>
      ) : null}
      <InputLabel htmlFor="name">이름</InputLabel>
      <Input
        name="name"
        type="text"
        placeholder="이름"
        {...formik.getFieldProps('name')}
      />
      {formik.touched.name && formik.errors.name ? (
        <InputErrorMessage>{formik.errors.name}</InputErrorMessage>
      ) : null}
      <InputLabel htmlFor="phone">휴대폰 번호</InputLabel>
      <Input
        name="phone"
        type="text"
        placeholder="휴대폰 번호"
        maxLength={13}
        {...formik.getFieldProps('phone')}
      />
      {formik.touched.phone && formik.errors.phone ? (
        <InputErrorMessage>{formik.errors.phone}</InputErrorMessage>
      ) : null}
      <SubmitButton type="submit">회원가입</SubmitButton>
    </ModalForm>
  );
};

export default RegisterForm;

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

const SubmitButton = styled(Button)`
  width: 100%;
  margin: 2rem 0;
  padding: 0.5rem;
  background-color: ${baseStyle.mainColor};

  &:hover {
    background-color: ${baseStyle.mainColor};
  }
`;
