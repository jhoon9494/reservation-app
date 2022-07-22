import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import CheckPeople from '../components/CheckPeople';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DateRangePick from '../components/DateRangePick';
import ReservationRooms from '../components/ReservationRooms';
import baseStyle from '../styles/baseStyle';
import axios from 'axios';

const Reservation = () => {
  const params = new URLSearchParams(window.location.search);
  let { roomID } = useParams();
  let peopleNumber = params.get('roomPeople');
  let roomName = params.get('roomData');

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

      //TODO 포스트맨으로 요청시 해당 객실에 예약이 있음에도 message:OK로 처리됩니다..수정 중
      if (res.status === 200) {
        console.log('중복된 예약이 없습니다.');
      }
    } catch (e) {
      if (e.response.status === 403) {
        alert('로그인한 유저만 예약할 수 있습니다');
      }
    }
  };
  return (
    <>
      <Navbar />
      <Container roomID={roomID}>
        <CheckPeople
          setPeople={setPeople}
          peopleNumber={peopleNumber ? peopleNumber : 6}
        />
        <DateRangePick setDate={setDate} roomID={roomID} />
      </Container>
      {roomID && (
        <SelectedRoomName>
          <h6>선택하신 객실은 : {roomName} 입니다.</h6>
        </SelectedRoomName>
      )}
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
      <Footer />
    </>
  );
};

export default Reservation;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 932px;
  margin: ${(props) => (props.roomID ? '157px auto auto' : '60px auto auto')};
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

const SelectedRoomName = styled.div`
  height: 100px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
