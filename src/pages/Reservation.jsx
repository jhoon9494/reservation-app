import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import CheckPeople from '../components/CheckPeople';
import DateRangePick from '../components/DateRangePick';
import ReservationRooms from '../components/ReservationRooms';
import baseStyle from '../styles/baseStyle';
import axios from 'axios';

const Reservation = () => {
  let { roomID } = useParams();

  const navigate = useNavigate();
  const [people, setPeople] = useState(0);
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const [roomInfo, setRoomInfo] = useState(roomID ? roomID : '');
  const [roomContent, setRoomContent] = useState({});

  useEffect(() => {
    async function getData() {
      if (roomInfo !== '') {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/room/${roomInfo}`
          );

          setRoomContent(res.data);
        } catch (e) {
          alert('객실정보를 받아올 수 없습니다.');
        }
      }
    }
    getData();
  }, [roomInfo]);

  const handleReserve = async () => {
    if (people > 0 && roomInfo && date.startDate && date.endDate) {
      const reserveData = JSON.stringify({
        roomID: roomInfo,
        startDate: date.startDate,
        endDate: date.endDate,
        people: people,
        price: roomContent.price,
        roomName: roomContent.name,
        roomImg: roomContent.imgSrc[0],
      });

      try {
        const res = await axios.get(
          `${
            process.env.REACT_APP_BACKEND_SERVER_URL
          }/api/booking/confirm?startDate=${JSON.stringify(
            date.startDate
          )}&endDate=${JSON.stringify(date.endDate)}&roomID=${roomInfo}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          sessionStorage.setItem('reserveData', reserveData);
          navigate('/payment');
        }
      } catch (e) {
        alert(e.response.data.reason);
      }
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Container roomID={roomID}>
        <CheckPeople
          setPeople={setPeople}
          maxPeopleNumber={roomID ? roomContent.maxPeople : 6}
        />
        <DateRangePick setDate={setDate} roomID={roomID} />
      </Container>
      {roomID && (
        <SelectedRoomName>
          <h6>선택하신 객실은 : {roomContent.name} 입니다.</h6>
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
    </div>
  );
};

export default Reservation;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 932px;
  margin: ${(props) => (props.roomID ? '157px auto 0' : '60px auto 0')};
`;

const MapContainer = styled.div`
  width: 65rem;
  height: 50rem;
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
  border: 1px solid ${baseStyle.mainColor};
  width: 140px;
  margin: 30px auto auto;

  &:hover {
    background-color: ${baseStyle.mainHoverColor};
    border: 1px solid ${baseStyle.mainHoverColor};
  }
`;

const SelectedRoomName = styled.div`
  height: 100px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
