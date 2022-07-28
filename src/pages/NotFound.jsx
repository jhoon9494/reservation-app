import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo src="/images/logo.png" alt="logo" onClick={() => navigate('/')} />
      <Title>페이지가 존재하지 않습니다.</Title>
      <Content align="center">
        링크를 잘못 입력하셨거나 요청이 만료된 페이지입니다.
        <br />
        로고 이미지를 클릭하면 메인페이지로 돌아갑니다.
      </Content>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`;

const Content = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  text-align: center;
`;
