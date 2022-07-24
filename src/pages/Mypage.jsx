import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';
import axios from 'axios';
//components
import Navbar from '../components/Navbar';
import MypageReservationCheck from '../components/MypageReservationCheck';
import MypageModal from '../components/MypageModal';
import MypageModifyMemberInfo from '../components/MypageModifyMemberInfo';

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
    const urlUser = `http://localhost:5000/api/user`;
    const urlBookingList = `http://localhost:5000/api/booking/user`;
    async function fetchBooking() {
      const token = sessionStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(urlBookingList, config, {
        perPage: 1,
        page: 1,
      });
      setGetBooking(res.data.bookingInfos);
      // setGetBooking(() => [...getBookings]);
    }
    async function fetchUser() {
      try {
        // const token =
        //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQxOTRhYjE1ZWJlMDg2YmIzZWQxOGQiLCJyb2xlIjoidXNlciIsImlhdCI6MTY1ODM4ODY1Nn0.4ETF84HQFNOTB7Grq0v6VJFt6oaYM0Cc8oCVJAfwIXA';
        const token = sessionStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(urlUser, config);
        const getUsers = await res.data;
        setGetUser(() => ({ ...getUsers }));
      } catch (e) {
        console.log(e);
      }
    }

    fetchBooking();
    fetchUser();
  }, []);

  // tab
  const tabs = ['예약조회', '정보수정'];
  const handleClickTab = (tab) => {
    setCurrTab(tab);
    if (tab === '정보수정') {
      setModalSelect({
        option: 'ModalCheckPassword',
        width: 370,
        height: 270,
      });
      setModalShow(true);
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
