import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { useNavigate } from 'react-router-dom';

//components
import MypageReservationCheck from '../components/MypageReservationCheck';
import MypageModal from '../components/MypageModal';
import MypageModifyMemberInfo from '../components/MypageModifyMemberInfo';

const MyPage = () => {
  const [checkPw, setCheckPw] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCookieValue = (name) =>
      document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() ||
      '';
    if (getCookieValue('userRole') !== 'user') {
      navigate('/');
    }
  }, []);

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
        <MypageReservationCheck />
      ) : currTab === '정보수정' && checkPw ? (
        <MypageModifyMemberInfo
          setCurrTab={setCurrTab}
          setCheckPw={setCheckPw}
        />
      ) : null}
      <MypageModal
        modalShow={modalShow}
        setModalShow={() => setModalShow(false)}
        modalSelect={modalSelect}
        setCheckPw={setCheckPw}
        setCurrTab={setCurrTab}
      />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
  width: 80%;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 560px;
  }
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
      color: ${baseStyle.mainColor};
      font-weight: bold;
      background: rgba(138, 168, 205, 0.0001);
      border-bottom: 5px solid ${baseStyle.mainColor};
    `}
`;
