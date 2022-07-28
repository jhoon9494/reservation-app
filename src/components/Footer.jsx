import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoWrap>
        <Logo src="/images/logo.png" alt="Logo" onClick={() => navigate('/')} />
      </LogoWrap>
      <ContentWrap>
        <Content>캠핑장 주소 : 12345 부산시 XX구 XXX로 XX</Content>
        <Content>
          사업자 등록번호 : 123-45-67890 / 대표 전화 : 010-1234-5678
        </Content>
        <Content>
          Copyright © dinggul-dinggul Camping Service. All Rights Reserved.
        </Content>
      </ContentWrap>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  display: flex;
  width: 100%;
  height: 120px;
  border-top: 1px solid lightgray;
  margin-top: 4rem;
  padding: 1rem 4rem;
  background-color: white;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  height: 85px;
`;

const Logo = styled.img`
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  color: ${baseStyle.navbarColor};
  font-size: ${baseStyle.contentFontSize};
`;

const Content = styled.p`
  margin: 0 2rem 0.25rem;
`;
