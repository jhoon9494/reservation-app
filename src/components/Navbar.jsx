import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import baseStyle from '../styles/baseStyle';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  // 로그아웃
  const handleLogoutClick = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/logout`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLogin(false);
      setIsAdmin(false);

      alert('로그아웃 되었습니다.');
    }
  };

  useEffect(() => {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      if (cookie.includes('userRole=user')) {
        setIsLogin(true);
        setIsAdmin(false);
      }
      if (cookie.includes('userRole=admin')) {
        setIsLogin(true);
        setIsAdmin(true);

        navigate('/admin');
      }
    });
    if (!cookies[0]) {
      setIsLogin(false);
      setIsAdmin(false);
      if (location.pathname === '/mypage' || location.pathname === '/admin') {
        navigate('/');
      }
    }
  }, [document.cookie]);

  useEffect(() => {
    if (location.pathname.includes('/about')) {
      setCurrentPage('about');
    }
    if (location.pathname.includes('/site')) {
      setCurrentPage('site');
    }
    if (location.pathname.includes('/reservation')) {
      setCurrentPage('reservation');
    }
  });

  return (
    <>
      <Modal open={loginModalOpen} close={() => setLoginModalOpen(false)}>
        <LoginForm close={() => setLoginModalOpen(false)} />
      </Modal>
      <Modal open={registerModalOpen} close={() => setRegisterModalOpen(false)}>
        <RegisterForm close={() => setRegisterModalOpen(false)} />
      </Modal>
      <NavigationBarWrap>
        <NavigationBar>
          <LogoWrap>
            <Logo
              src="/images/logo.png"
              alt="logo"
              onClick={() => navigate('/')}
            />
          </LogoWrap>
          <NavigationMenuWrap>
            <NavigationMunu
              active={currentPage === 'about'}
              onClick={() => navigate('/about')}
            >
              About
            </NavigationMunu>
            <NavigationMunu
              active={currentPage === 'site'}
              onClick={() => navigate('/site')}
            >
              Cabins
            </NavigationMunu>
            <NavigationMunu
              active={currentPage === 'reservation'}
              onClick={() => navigate('/reservation')}
            >
              Reservation
            </NavigationMunu>
          </NavigationMenuWrap>
          <SignWrap>
            {isLogin ? (
              <>
                {isAdmin ? (
                  <Sign onClick={() => navigate('/admin')}>Admin</Sign>
                ) : (
                  <Sign onClick={() => navigate('/mypage')}>MyPage</Sign>
                )}
                <Sign onClick={handleLogoutClick}>Logout</Sign>
              </>
            ) : (
              <>
                <Sign onClick={handleLoginClick}>Login</Sign>
                <Sign onClick={handleRegisterClick}>Register</Sign>
              </>
            )}
          </SignWrap>
        </NavigationBar>
      </NavigationBarWrap>
    </>
  );
};

export default Navbar;

const NavigationBarWrap = styled.header`
  width: 100%;
  height: 65px;
  border-bottom: 1px solid darkgray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  font-weight: bold;
  z-index: 999;
  background-color: white;
`;

const NavigationBar = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
`;

const LogoWrap = styled.div`
  width: 200px;
  height: 90%;
`;

const Logo = styled.img`
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const NavigationMenuWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavigationMunu = styled.li`
  height: 100%;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  text-align: center;
  font-size: ${baseStyle.navbarFontSize};
  color: ${baseStyle.navbarColor};
  border-bottom: 4px solid
    ${(props) => (props.active ? baseStyle.mainColor : 'white')};

  &:hover {
    cursor: pointer;
    color: ${baseStyle.navbarHoverColor};
  }
`;

const SignWrap = styled.ul`
  display: flex;
  margin: 0;
  justify-content: end;
  list-style: none;
  width: 200px;
`;

const Sign = styled.li`
  font-size: ${baseStyle.navbarFontSize};
  color: ${baseStyle.navbarColor};
  transition: color 0.5s;

  &:hover {
    cursor: pointer;
    color: ${baseStyle.navbarHoverColor};
  }

  & + & {
    margin-left: 2rem;
  }
`;
