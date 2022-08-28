import { useState, useEffect } from 'react';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { BsCheckLg } from 'react-icons/bs';
import axios from 'axios';

const RoomsButton = ({
  setRoomInfo,
  selectedDate,
  people,
  setAvailableRooms,
  windowSize,
  roomInfo,
}) => {
  // 둘러보기 페이지에서 접근 시 selectedRoom값이 자동 설정됨.
  // 예약페이지로 바로 접근 시 selectedRoom값은 공백
  const [allRooms, setAllRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [reservedRoomsData, setReservedRoomsData] = useState([]);

  // 전체 객실 정보 받아오기
  useEffect(() => {
    async function getAllRooms() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/room`
        );
        setAllRooms(res.data);
      } catch (e) {
        console.error('객실정보를 받아올 수 없습니다.');
      }
    }
    getAllRooms();
  }, []);

  // 예약 불가능한 객실id 받아오기
  useEffect(() => {
    async function getReservedRooms() {
      // 입실, 퇴실, 인원 수를 설정해야 api 요청 가능
      // 둘러보기에서 예약페이지로 넘어올 경우 현재 컴포넌트를 사용하지 않는 로직때문에 api 호출하지 않음.
      if (people && selectedDate?.startDate && selectedDate?.endDate) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/booking/byDates`,
            {
              params: {
                startDate: selectedDate.startDate,
                endDate: selectedDate.endDate,
                peopleNumber: people,
              },
            }
          );
          setReservedRoomsData(res.data);
          const availableRooms = allRooms.filter(
            (room) => !res.data.includes(room._id)
          );
          setAvailableRooms(availableRooms);
        } catch (e) {
          console.error('객실정보를 받아올 수 없습니다.');
        }
      }
    }
    getReservedRooms();
    // 날짜와 인원 수를 변경할 경우 선택된 객실 초기화
    setSelectedRoom('');
    setRoomInfo('');
  }, [selectedDate, people]);

  useEffect(() => {
    setSelectedRoom(roomInfo);
  }, [roomInfo]);

  const handleSelectRoom = (roomID) => {
    if (reservedRoomsData.includes(roomID)) return;
    if (people && selectedDate) {
      setSelectedRoom(roomID);
      setRoomInfo(roomID);
    } else {
      alert('인원과 일정을 먼저 선택해주세요!');
    }
  };

  return (
    <>
      {allRooms.map((room) => {
        // 카라반 위치
        if (room.roomType === 'Caravan') {
          return (
            <Caravan
              key={room.name}
              top={room.position.top}
              right={room.position.right}
              onClick={() => windowSize > 768 && handleSelectRoom(room._id)}
            >
              {selectedRoom === room._id ? (
                <>
                  <img src={room.icon} alt={room.name} />
                  <CheckRoom type={room.roomType} />
                </>
              ) : reservedRoomsData.includes(room._id) ? (
                <div style={{ cursor: 'not-allowed' }}>
                  <img src="/images/Caravan_disabled.png" alt={room.name} />
                </div>
              ) : (
                <img src={room.icon} alt={room.name} />
              )}
            </Caravan>
          );
        }
        // 텐트장 위치
        if (room.roomType === 'Tent') {
          return (
            <Tent
              key={room.name}
              top={room.position.top}
              right={room.position.right}
              onClick={() => windowSize > 768 && handleSelectRoom(room._id)}
            >
              {selectedRoom === room._id ? (
                <>
                  <img src={room.icon} alt={room.name} />
                  <CheckRoom type={room.roomType} />
                </>
              ) : reservedRoomsData.includes(room._id) ? (
                <div style={{ cursor: 'not-allowed' }}>
                  <img src="/images/Tent_disabled.png" alt={room.name} />
                </div>
              ) : (
                <img src={room.icon} alt={room.name} />
              )}
            </Tent>
          );
        }
        // 글램핑장 위치
        if (room.roomType === 'Glamping') {
          return (
            <Glamp
              key={room.name}
              top={room.position.top}
              right={room.position.right}
              onClick={() => windowSize > 768 && handleSelectRoom(room._id)}
            >
              {selectedRoom === room._id ? (
                <>
                  <img src={room.icon} alt={room.name} />
                  <CheckRoom type={room.roomType} />
                </>
              ) : reservedRoomsData.includes(room._id) ? (
                <div style={{ cursor: 'not-allowed' }}>
                  <img src="/images/Glamping_disabled.png" alt={room.name} />
                </div>
              ) : (
                <img src={room.icon} alt={room.name} />
              )}
            </Glamp>
          );
        }
      })}
    </>
  );
};

export default RoomsButton;

const Caravan = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  right: ${(props) => props.right}%;
  width: 100px;
  height: 70px;
  overflow: hidden;

  img {
    width: 200px;
    transform: translate(-55px, -30px);
  }

  :hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 2.7rem;
    height: 1.5rem;

    img {
      width: 200%;
      transform: translate(-25px, -18px);
    }
  }
`;

const Tent = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  right: ${(props) => props.right}%;
  width: 60px;
  height: 50px;
  overflow: hidden;

  img {
    width: 150px;
    transform: translate(-50px, -20px);
  }
  :hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;

    img {
      width: 250%;
      transform: translate(-20px, -6px);
    }
  }
`;

const Glamp = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  right: ${(props) => props.right}%;
  width: 60px;
  height: 50px;
  overflow: hidden;

  img {
    width: 150px;
    transform: translate(-43px, -22px);
  }

  :hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 1.8rem;
    height: 1.8rem;

    img {
      width: 250%;
      transform: translate(-20px, -7px);
    }
  }
`;

const CheckRoom = styled(BsCheckLg)`
  color: ${baseStyle.mainColor};
  transform: scale(3)
    ${(props) =>
      props.type === 'Caravan'
        ? 'translate(10px,-40px)'
        : props.type === 'Tent'
        ? 'translate(8px,-30px)'
        : 'translate(8px,-30px)'};

  @media (max-width: 768px) {
    transform: scale(2)
      ${(props) =>
        props.type === 'Caravan'
          ? 'translate(5px, -30px)'
          : props.type === 'Tent'
          ? 'translate(3px, -20px)'
          : 'translate(4px, -25px)'};
  }
`;
