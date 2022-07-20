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
  const [roomsData, setRoomsData] = useState([]);

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
            },
          }
          // TODO 받아온 api 값이 선택 불가능한 객실인지 가능한 객실인지?
          // 인원수에 따라 받아오는 결과가 다른데 왜그런지??
        );

        console.log(res.data);

        setRoomsData(['C-102호', 'T-201호', 'G-301호']);
      }
    }
    getRooms();
  }, [selectedDate, people]);

  const handleRoomDetail = (data) => {
    // TODO
    // 특정 날짜에 선택가능한 객실 목록을 받은 후, 해당 목록에 없는 객실은 setSelectedRoom 못하게 막기
    setSelectedRoom(data);
    setRoomInfo(data);
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
            {/* TODO 조건문 추가하여 특정 날짜에 객실 선택 가능 및 불가능 표시, 불가능할 경우 클릭 못하게 막기 */}
            {selectedRoom === caravan.id && (
              <BsCheckLg
                style={{
                  color: baseStyle.mainColor,
                  transform: 'scale(3.0) translate(5px)',
                }}
              />
            )}
            {roomsData.some((room) => room === caravan.name) ? (
              <VscCircleLargeOutline
                style={{
                  color: 'blue',
                  transform: 'scale(4.0) translate(5px, 1px)',
                }}
              />
            ) : (
              <VscChromeClose
                style={{
                  color: 'red',
                  transform: 'scale(4.0) translate(5px, 1px)',
                }}
              />
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
            {selectedRoom === tent.name && (
              <BsCheckLg
                style={{
                  color: baseStyle.mainColor,
                  transform: 'scale(2.5) translate(5px)',
                }}
              />
            )}
            {roomsData.some((room) => room === tent.name) ? (
              <VscCircleLargeOutline
                style={{
                  color: 'blue',
                  transform: 'scale(3.0) translate(5px, 3px)',
                }}
              />
            ) : (
              <VscChromeClose
                style={{
                  color: 'red',
                  transform: 'scale(3.0) translate(5px, 3px)',
                }}
              />
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
            {selectedRoom === glamp.name && (
              <BsCheckLg
                style={{
                  color: baseStyle.mainColor,
                  transform: 'scale(3.0) translate(5px)',
                }}
              />
            )}
            {roomsData.some((room) => room === glamp.name) ? (
              <VscCircleLargeOutline
                style={{
                  color: 'blue',
                  transform: 'scale(3.0) translate(5px, 3px)',
                }}
              />
            ) : (
              <VscChromeClose
                style={{
                  color: 'red',
                  transform: 'scale(3.0) translate(5px, 3px)',
                }}
              />
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
