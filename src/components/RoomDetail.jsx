import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import RoomTabs from './RoomTabs';
import RoomImageSlider from './RoomImageSlider';
import RoomDetailContent from './RoomDetailContent';
import RoomReviews from './RoomReviews';
import axios from 'axios';

export const RoomDetail = ({ roomID, windowSize }) => {
  const [currTab, setCurrTab] = useState('객실 설명');
  const [roomContent, setRoomContent] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      if (roomID !== '') {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/room/${roomID}`
          );
          setRoomContent(res.data);
        } catch (e) {
          console.error('객실정보를 받아올 수 없습니다.');
        }
      }
    }
    getData();
  }, [roomID]);

  return (
    <RoomWrap>
      <Header id="roomTitle">{roomContent.name}</Header>
      <RoomImageSlider roomContent={roomContent} windowSize={windowSize} />
      <ContentContainer>
        <RoomTabs currTab={currTab} setCurrTab={setCurrTab} />
        {currTab === '객실 설명' ? (
          <RoomDetailContent roomData={roomContent} />
        ) : (
          <RoomReviews roomID={roomContent._id} />
        )}
      </ContentContainer>

      <ReserveBtn
        onClick={() => {
          navigate(`/reservation/${roomID}`);
        }}
      >
        예약하기
      </ReserveBtn>
    </RoomWrap>
  );
};

const RoomWrap = styled.div`
  width: 600px;

  @media (max-width: 768px) {
    width: 500px;
    margin: 40px auto;
  }
`;

const Header = styled.div`
  width: 222px;
  font-size: ${baseStyle.titleFontSize};
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  width: 550px;
  height: 250px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 500px;
    border-radius: 5px;
    box-shadow: 3px 3px 10px #c3c3c3;
  }
`;

const ReserveBtn = styled(Button)`
  display: block;
  background-color: ${baseStyle.mainColor};
  border: 1px solid ${baseStyle.mainColor};
  width: 140px;
  margin: auto;

  &:hover {
    background-color: ${baseStyle.mainHoverColor};
    border: 1px solid ${baseStyle.mainHoverColor};
  }

  @media (max-width: 768px) {
    width: 500px;
    margin-top: 30px;
  }
`;
