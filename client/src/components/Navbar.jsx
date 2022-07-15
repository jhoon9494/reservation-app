import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
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
  // 로그아웃
  const handleLogoutClick = () => {
    setUser('');
  };

  useEffect(() => {
    // TODO: 로그인 여부 확인
    setUser('엘리스');
  }, [user]);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <Modal
        open={loginModalOpen}
        close={() => setLoginModalOpen(false)}
        title="로그인"
      >
        <LoginForm />
      </Modal>
      <Modal
        open={registerModalOpen}
        close={() => setRegisterModalOpen(false)}
        title="회원가입"
      >
        <RegisterForm />
      </Modal>
      <NavigationBarWrap>
        <NavigationBar>
          <LogoWrap>
            <Logo src="images/logo.png" alt="logo" onClick={handleLogoClick} />
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
            {!user ? (
              <>
                <Sign onClick={handleMyPageClick}>MyPage</Sign>
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

const NavigationBarWrap = styled.div`
  width: 100%;
  height: 90px;
  border-bottom: 1px solid darkgray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  color: white;
  font-weight: bold;
  z-index: 999;
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
`;

const Logo = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const NavigationMenuWrap = styled.ul`
  display: flex;
  margin: 0;
  list-style: none;
`;

const NavigationMunu = styled.li`
  & + & {
    margin-left: 3rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 0.5s;
  color: white;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
    color: black;
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
  transition: color 0.5s;

  &:hover {
    cursor: pointer;
    color: black;
  }

  & + & {
    margin-left: 2rem;
  }
`;
