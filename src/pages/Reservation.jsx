import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import CheckPeople from '../components/CheckPeople';
import Navbar from '../components/Navbar';
import DateRangePick from '../components/DateRangePick';
import RoomsButton from '../components/RoomsButton';
import baseStyle from '../styles/baseStyle';

const Reservation = () => {
  let { roomID } = useParams();
  const [data, setData] = useState({
    people: 0,
    startDate: 0,
    endDate: 0,
    roomInfo: '',
  });
  const [people, setPeople] = useState(0);
  const [date, setDate] = useState('');
  const [roomInfo, setRoomInfo] = useState(roomID ? roomID : '');

  useEffect(() => {
    setData({
      people: people,
      startDate: date.startDate,
      endDate: date.endDate,
      roomInfo: roomInfo,
    });
  }, [people, date, roomInfo]);

  const handleReserve = () => {
    console.log(data);
  };
  return (
    <>
      <Navbar />
      <Container>
        <CheckPeople setPeople={setPeople} />
        <DateRangePick setDate={setDate} />
      </Container>
      {/* 둘러보기 페이지에서 객실을 선택하고 온 경우 별도로 캠핑장 지도를 보여주지 않음. */}
      {!roomID && (
        <MapContainer>
          <MapImg src="/campMapImg.png" alt="mapImg" />
          <RoomsButton selectedID={roomID} setRoomInfo={setRoomInfo} />
        </MapContainer>
      )}
      <ReserveBtn onClick={handleReserve}>예약하기</ReserveBtn>
    </>
  );
};

export default Reservation;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 932px;
  margin: 157px auto auto;
`;

const MapContainer = styled.div`
  width: 932px;
  height: 637px;
  margin: 50px auto auto;
  position: relative;
`;

const MapImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ReserveBtn = styled(Button)`
  display: block;
  background-color: ${baseStyle.mainColor};
  width: 140px;
  margin: 50px auto 38px;
`;
