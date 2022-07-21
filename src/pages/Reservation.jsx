import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import CheckPeople from '../components/CheckPeople';
import Navbar from '../components/Navbar';
import DateRangePick from '../components/DateRangePick';
import ReservationRooms from '../components/ReservationRooms';
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
  const [date, setDate] = useState({ startDate: '', endDate: '' });
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
        <DateRangePick setDate={setDate} roomID={roomID} />
      </Container>
      {/* FIXME 둘러보기 페이지에서 객실을 선택하고 온 경우 별도로 캠핑장 지도를 보여주지 않음?? 회의해서 정하기 */}
      {!roomID && (
        <MapContainer>
          <MapImg src="/images/campMapImg.png" alt="mapImg" />
          <ReservationRooms
            setRoomInfo={setRoomInfo}
            selectedDate={date}
            people={people}
          />
        </MapContainer>
      )}
      {/* TODO 결제 페이지로 넘어가기 전 api요청,
          => api요청 시 find해서 이미 예약된 객실이라고 뜬다면 예약하지 못하도록 막기, 선택된 결과가 없다면 그대로 결제 진행 */}
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
  opacity: 0.7;
`;

const ReserveBtn = styled(Button)`
  display: block;
  background-color: ${baseStyle.mainColor};
  width: 140px;
  margin: 50px auto 38px;
`;
