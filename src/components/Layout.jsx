import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';

const Layout = () => {
  const location = useLocation();

  return (
    <Container>
      <Navbar />
      <Main role="main">
        <Outlet />
      </Main>
      {location.pathname !== '/' && <Footer />}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  min-height: 100vh;

  @media (max-width: 768px) {
    overflow-y: scroll;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  width: 1280px;
  margin: 2rem;
`;
