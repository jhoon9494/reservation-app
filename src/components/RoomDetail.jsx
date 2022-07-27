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

export const RoomDetail = ({ roomID }) => {
  const [currTab, setCurrTab] = useState('객실 설명');
  const [roomContent, setRoomContent] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      if (roomID !== '') {
        try {
          const res = await axios.get(
            `http://kdt-sw2-busan-team03.elicecoding.com:5000/api/room/${roomID}`
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
    <div style={{ width: '750px' }}>
      <Header id="roomTitle">{roomContent.name}</Header>
      <RoomImageSlider roomContent={roomContent} />
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
    </div>
  );
};

const Header = styled.div`
  width: 222px;
  font-size: ${baseStyle.titleFontSize};
  margin: 54px auto auto;
  text-align: center;
`;

const ContentContainer = styled.div`
  width: 650px;
  height: 388px;
  margin: 23px auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReserveBtn = styled(Button)`
  display: block;
  background-color: ${baseStyle.mainColor};
  border: 1px solid ${baseStyle.mainColor};
  width: 140px;
  margin: 17px auto 38px;

  &:hover {
    background-color: ${baseStyle.mainHoverColor};
    border: 1px solid ${baseStyle.mainHoverColor};
  }
`;
