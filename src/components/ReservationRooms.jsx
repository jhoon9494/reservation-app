import { useState, useEffect } from 'react';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
// import { RoomModal } from './RoomModal';
import { BsCheckLg } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';
import { VscCircleLargeOutline } from 'react-icons/vsc';
import axios from 'axios';

const RoomsButton = ({ selectedID, setRoomInfo, selectedDate, people }) => {
  // 둘러보기 페이지에서 접근 시 selectedRoom값이 자동 설정됨.
  // 예약페이지로 바로 접근 시 selectedRoom값은 공백
  const [selectedRoom, setSelectedRoom] = useState(selectedID);
  const [reservedRoomsData, setReservedRoomsData] = useState([]);

  useEffect(() => {
    async function getRooms() {
      // 입실, 퇴실, 인원 수를 설정해야 api 요청 가능
      // 둘러보기에서 예약페이지로 넘어올 경우 현재 컴포넌트를 사용하지 않는 로직때문에 api 호출하지 않음.
      if (people && selectedDate?.startDate && selectedDate?.endDate) {
        const res = await axios.get(
          'http://localhost:5000/api/booking/byDates',
          {
            params: {
              startDate: selectedDate.startDate,
              endDate: selectedDate.endDate,
              peopleNumber: people,
              // FIXME  객실 정보 api를 모두 받아온 후 인원수 프론트단에서 처리하기
              // TODO 객실 정보를 받아온 후 각 객실 버튼에 id값 할당해야 함.
            },
          }
        );

        // FIXME api요청을 했을 때 예약된 객실이 없을 경우 여전히 빈 배열을 반환하여 객실을 선택할 수 없음.
        // 객실 id와 연관없는 임의의 문자열을 배열에 넣어줘서 객실을 선택할 수 있도록 하였으나, 추후 수정 필요.
        if (res.data.length == 0) {
          setReservedRoomsData(['empty']);
          return;
        }
        setReservedRoomsData(res.data);
      }
    }
    getRooms();
    // 날짜와 인원수를 변경할 경우 선택된 객실 초기화
    setSelectedRoom(selectedID);
  }, [selectedDate, people]);

  const handleRoomDetail = (roomID) => {
    // 인원 수와 입, 퇴실 날짜를 선택하지 않았다면 api요청이 되지 않음
    // 그렇게 되면 reservedRoomsData값은 빈배열을 가지게 되므로
    // setSelectedRoom 및 setRoomInfo함수가 동작하지 않아서 선택되지 않음.
    // 또한, 예약된 객실데이터에 포함된 객실일 경우 마찬가지로 아래 함수가 동작하지 않아서 선택되지 않음.
    reservedRoomsData.some((room) => room !== roomID) &&
      (() => {
        setSelectedRoom(roomID);
        setRoomInfo(roomID);
      })();
  };
  const caravans = [
    { top: 10, left: 32, name: 'C-101호', id: '62d5365e88ab7290bffbdb42' },
    { top: 15.3, left: 40.6, name: 'C-102호', id: '62d58c76d04deeeeda401ff2' },
    { top: 21.3, left: 50, name: 'C-103호', id: '3' },
    { top: 27.7, left: 29, name: 'C-104호', id: '4' },
    { top: 84, left: 28, name: 'C-105호', id: '5' },
    { top: 80, left: 39.4, name: 'C-106호', id: '6' },
  ];

  const tents = [
    { top: 33.5, right: 42.5, name: 'T-201호' },
    { top: 33.3, right: 36.7, name: 'T-202호' },
    { top: 32.8, right: 30.6, name: 'T-203호' },
    { top: 32.5, right: 25, name: 'T-204호' },
    { top: 45, right: 39.5, name: 'T-205호' },
    { top: 45, right: 34, name: 'T-206호' },
    { top: 44.9, right: 27.6, name: 'T-207호' },
  ];

  const glamps = [
    { top: 55, right: 42, name: 'G-301호' },
    { top: 55.5, right: 35, name: 'G-302호' },
    { top: 56, right: 29, name: 'G-303호' },
    { top: 66.5, right: 44, name: 'G-304호' },
    { top: 66.8, right: 37.8, name: 'G-305호' },
    { top: 68.3, right: 31.3, name: 'G-306호' },
    { top: 69.4, right: 25.1, name: 'G-307호' },
  ];
  return (
    <>
      {/* 카라반 좌표  */}
      {caravans.map((caravan) => {
        return (
          <Caravan
            key={caravan.name}
            top={caravan.top}
            left={caravan.left}
            onClick={() => handleRoomDetail(caravan.id)}
          >
            {/* 선택된 객실과 해당 객실의 id가 같을 경우 체크 표시 */}
            {/* 다를 경우 1. 예약된 객실데이터에 포함된 객실이면 X표시(선택불가) */}
            {/* 다를 경우 2. 예약된 객실데이터에 포함되지 않은 객실이면 O표시(선택가능)*/}
            {selectedRoom === caravan.id ? (
              <CheckRoom />
            ) : reservedRoomsData.some((room) => room !== caravan.id) ? (
              <SelectableCaravan />
            ) : (
              <NonSelectableCaravan />
            )}
          </Caravan>
        );
      })}

      {/* 텐트 좌표 */}
      {tents.map((tent) => {
        return (
          <Tent
            key={tent.name}
            top={tent.top}
            right={tent.right}
            onClick={() => handleRoomDetail(tent.name)}
          >
            {selectedRoom === tent.name ? (
              <CheckRoom />
            ) : reservedRoomsData.some((room) => room !== tent.name) ? (
              <SelectableTentAndGlamp />
            ) : (
              <NonSelectableTentAndGlamp />
            )}
          </Tent>
        );
      })}

      {/* 글램핑 좌표 */}

      {glamps.map((glamp) => {
        return (
          <Glamp
            key={glamp.name}
            top={glamp.top}
            right={glamp.right}
            onClick={() => handleRoomDetail(glamp.name)}
          >
            {selectedRoom === glamp.name ? (
              <CheckRoom />
            ) : reservedRoomsData.some((room) => room !== glamp.name) ? (
              <SelectableTentAndGlamp />
            ) : (
              <NonSelectableTentAndGlamp />
            )}
          </Glamp>
        );
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
