import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';
//components
import Navbar from '../components/Navbar';
import MypageReservationCheck from '../components/MypageReservationCheck';
import MypageModal from '../components/MypageModal';
import MypageModifyMemberInfo from '../components/MypageModifyMemberInfo';
// import axios from 'axios';

const MyPage = () => {
  const [getUser, setGetUser] = useState({});
  const [getBooking, setGetBooking] = useState([]);

  const [checkPw, setCheckPw] = useState(false);

  // modal 제어
  const [modalShow, setModalShow] = useState(false);
  // modal창에 넘길 값
  const [modalSelect, setModalSelect] = useState({
    option: '',
    width: 0,
    height: 0,
    userPw: '',
  });
  // tab제어
  const [currTab, setCurrTab] = useState('예약조회');

  useEffect(() => {
    console.log('useEffect');
    const urlUser = `../../mock/userMock.json`;
    const urlBookingList = `../../mock/bookingMock.json`;
    async function fetchBooking() {
      const res = await fetch(urlBookingList);
      const getBookings = await res.json();
      // TODO: 해당 유저 아이디로 찾는 것 있어야함
      setGetBooking(() => [...getBookings]);
    }
    async function fetchUser() {
      const res = await fetch(urlUser);
      const getUsers = await res.json();
      setGetUser(() => ({ ...getUsers[0] }));
    }

    fetchBooking();
    fetchUser();
  }, []);

  // tab
  const tabs = ['예약조회', '정보수정'];
  const handleClickTab = (tab) => {
    setCurrTab(tab);
    const userPw = getUser.password;
    if (tab === '정보수정') {
      setModalSelect({
        option: 'ModalCheckPassword',
        width: 370,
        height: 270,
        userPw: userPw,
      });
      setModalShow(true);
      console.log(userPw);
    }
  };

  return (
    <Container>
      <Navbar />
      <TabContainer>
        {tabs.map((tab, i) => {
          return (
            <EactTab
              key={`${tab}-${i}`}
              active={currTab === tab}
              onClick={() => handleClickTab(tab)}
            >
              {tab}
            </EactTab>
          );
        })}
      </TabContainer>
      {currTab === '예약조회' ? (
        <MypageReservationCheck getBooking={getBooking} />
      ) : currTab === '정보수정' && checkPw ? (
        <MypageModifyMemberInfo getUser={getUser} />
      ) : null}
      <MypageModal
        modalShow={modalShow}
        setModalShow={() => setModalShow(false)}
        modalSelect={modalSelect}
        setCheckPw={setCheckPw}
      />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
  width: 80%;
  margin: 0 auto;
`;

const EactTab = styled.p`
  font-size: ${baseStyle.titleFontSize};
  line-height: 30px;
  color: #000;
  padding: 16px 14px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 0;
  cursor: pointer;
  position: relative;
  + p:before {
    content: '';
    position: absolute;
    left: -20px;
    padding: 20px 34px 20px 0;
    border-left: 1px solid #000;
  }
  ${(props) =>
    props.active &&
    css`
      color: #524fa1;
      font-weight: bold;
      background: rgba(230, 230, 230, 0.0001);
      border-bottom: 5px solid #524fa1;
    `}
`;
