import { useState, useEffect } from 'react';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { caravans, tents, glamps } from '../styles/roomsCoordinate';
import { BsCheckLg } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';
import { VscCircleLargeOutline } from 'react-icons/vsc';
import axios from 'axios';

const RoomsButton = ({ setRoomInfo, selectedDate, people }) => {
  // 둘러보기 페이지에서 접근 시 selectedRoom값이 자동 설정됨.
  // 예약페이지로 바로 접근 시 selectedRoom값은 공백
  const [allRooms, setAllRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [reservedRoomsData, setReservedRoomsData] = useState([]);

  // 전체 객실 정보 받아오기
  useEffect(() => {
    async function getAllRooms() {
      const res = await axios.get('http://localhost:5000/api/room');
      setAllRooms(res.data);
    }
    getAllRooms();
  }, []);

  // 예약 불가능한 객실id 받아오기
  useEffect(() => {
    async function getReservedRooms() {
      // 입실, 퇴실, 인원 수를 설정해야 api 요청 가능
      // 둘러보기에서 예약페이지로 넘어올 경우 현재 컴포넌트를 사용하지 않는 로직때문에 api 호출하지 않음.
      if (people && selectedDate?.startDate && selectedDate?.endDate) {
        const res = await axios.get(
          'http://localhost:5000/api/booking/byDates',
          {
            params: {
              startDate: selectedDate.startDate,
              endDate: selectedDate.endDate,
              // FIXME  객실 정보 api를 모두 받아온 후 인원수 프론트단에서 처리하기
              peopleNumber: people,
            },
          }
        );
        setReservedRoomsData(res.data);
      }
    }
    getReservedRooms();
    // 날짜와 인원 수를 변경할 경우 선택된 객실 초기화
    setSelectedRoom('');
    setRoomInfo('');
  }, [selectedDate, people]);

  const handleSelectRoom = (roomID) => {
    if (reservedRoomsData.includes(roomID)) return;
    setSelectedRoom(roomID);
    setRoomInfo(roomID);
  };

  return (
    <>
      {allRooms.map((room) => {
        // 카라반 위치
        if (room.name[0] === 'C') {
          return (
            <Caravan
              key={room.name}
              top={caravans[room.name].top}
              left={caravans[room.name].left}
              onClick={() => handleSelectRoom(room._id)}
            >
              {selectedRoom === room._id ? (
                <CheckRoom />
              ) : reservedRoomsData.includes(room._id) ? (
                <NonSelectableCaravan />
              ) : (
                <SelectableCaravan />
              )}
            </Caravan>
          );
        }
        // 텐트장 위치
        if (room.name[0] === 'T') {
          return (
            <Tent
              key={room.name}
              top={tents[room.name].top}
              right={tents[room.name].right}
              onClick={() => handleSelectRoom(room._id)}
            >
              {selectedRoom === room._id ? (
                <CheckRoom />
              ) : reservedRoomsData.includes(room._id) ? (
                <NonSelectableTentAndGlamp />
              ) : (
                <SelectableTentAndGlamp />
              )}
            </Tent>
          );
        }
        // 글램핑장 위치
        if (room.name[0] === 'G') {
          return (
            <Glamp
              key={room.name}
              top={glamps[room.name].top}
              right={glamps[room.name].right}
              onClick={() => handleSelectRoom(room._id)}
            >
              {selectedRoom === room._id ? (
                <CheckRoom />
              ) : reservedRoomsData.includes(room._id) ? (
                <NonSelectableTentAndGlamp />
              ) : (
                <SelectableTentAndGlamp />
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
  left: ${(props) => props.left}%;
  width: 60px;
  height: 40px;

  :hover {
    cursor: pointer;
  }
`;

const Tent = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  right: ${(props) => props.right}%;
  width: 40px;
  height: 35px;

  :hover {
    cursor: pointer;
  }
`;

const Glamp = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  right: ${(props) => props.right}%;
  width: 45px;
  height: 40px;

  :hover {
    cursor: pointer;
  }
`;

const CheckRoom = styled(BsCheckLg)`
  color: ${baseStyle.mainColor};
  transform: scale(3) translate(5px);
`;

const SelectableCaravan = styled(VscCircleLargeOutline)`
  color: blue;
  transform: scale(4) translate(5px, 1px);
`;

const NonSelectableCaravan = styled(VscChromeClose)`
  color: red;
  transform: scale(4) translate(5px, 1px);
`;

const SelectableTentAndGlamp = styled(VscCircleLargeOutline)`
  color: blue;
  transform: scale(3) translate(5px, 3px);
`;

const NonSelectableTentAndGlamp = styled(VscChromeClose)`
  color: red;
  transform: scale(3) translate(5px, 3px);
`;
