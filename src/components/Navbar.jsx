import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  // 마이페이지
  const handleMyPageClick = () => {
    navigate('/mypage');
  };

  // 관리자
  const handleAdminClick = () => {
    navigate('/admin');
  };

  // 로그아웃
  const handleLogoutClick = async () => {
    try {
      await axios.get(
        'http://kdt-sw2-busan-team03.elicecoding.com:5000/api/logout',
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
  const handleLogoClick = () => {
    navigate('/');
  };

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
            <Logo src="/images/logo.png" alt="logo" onClick={handleLogoClick} />
          </LogoWrap>
          <NavigationMenuWrap>
            <NavigationMunu>
              <StyledLink to="/about">About</StyledLink>
            </NavigationMunu>
            <NavigationMunu>
              <StyledLink to="/site">Cabins</StyledLink>
            </NavigationMunu>
            <NavigationMunu>
              <StyledLink to="/reservation">Reservation</StyledLink>
            </NavigationMunu>
          </NavigationMenuWrap>
          <SignWrap>
            {isLogin ? (
              <>
                {isAdmin ? (
                  <Sign onClick={handleAdminClick}>Admin</Sign>
                ) : (
                  <Sign onClick={handleMyPageClick}>MyPage</Sign>
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
  height: 90px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
`;

const LogoWrap = styled.div`
  width: 200px;
  height: 85px;
`;

const Logo = styled.img`
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const NavigationMenuWrap = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  justify-content: center;
  align-items: center;
`;

const NavigationMunu = styled.li`
  & + & {
    margin-left: 3rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: ${baseStyle.navbarFontSize};
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
