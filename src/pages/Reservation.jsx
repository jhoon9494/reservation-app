import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import CheckPeople from '../components/CheckPeople';
import Navbar from '../components/Navbar';
import DateRangePick from '../components/DateRangePick';
import ReservationRooms from '../components/ReservationRooms';
import baseStyle from '../styles/baseStyle';
import axios from 'axios';

const Reservation = () => {
  let { roomID } = useParams();

  const [people, setPeople] = useState(0);
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const [roomInfo, setRoomInfo] = useState(roomID ? roomID : '');

  const handleReserve = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/booking/confirm', {
        params: {
          startDate: JSON.stringify(date.startDate),
          endDate: JSON.stringify(date.endDate),
          roomID: JSON.stringify(roomInfo),
        },
      });

      if (res.status === 200) {
        console.log('중복된 예약이 없습니다.');
      }
    } catch (e) {
      console.log(e);
    }
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
