import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { RoomModal } from './RoomModal';
import { BsCheckLg } from 'react-icons/bs';

// RoomsButton 컴포넌트는 Site, Reservation 두 컴포넌트에서 모두 사용
const RoomsButton = ({ selectedID, setRoomInfo }) => {
  const [modalShow, setModalShow] = useState(false);
  // 둘러보기 페이지에서 예약페이지로 넘어간 경우
  // 둘러보기 페이지에서 선택한 객실을 selected값으로 지정
  const [selectedRoom, setSelectedRoom] = useState(
    selectedID ? selectedID : ''
  );
  const location = useLocation();

  const handleRoomDetail = (roomName) => {
    setModalShow(true);

    // 객실 상세정보의 경우 객실명을 모달창에 상태로 전달한 후 모달창에서 api를 요청
    setSelectedRoom(roomName);

    // setRoomInfo props는 예약페이지에서만 전달하므로 별도 조건으로 묶음
    location.pathname === '/reservation' && setRoomInfo(roomName);
  };
  const caravans = [
    { top: 10, left: 32, name: 'C-101호' },
    { top: 15.3, left: 40.6, name: 'C-102호' },
    { top: 21.3, left: 50, name: 'C-103호' },
    { top: 27.7, left: 29, name: 'C-104호' },
    { top: 84, left: 28, name: 'C-105호' },
    { top: 80, left: 39.4, name: 'C-106호' },
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
      {/* 카라반 아이콘 */}
      {caravans.map((caravan) => {
        return (
          <Caravan
            key={caravan.name}
            top={caravan.top}
            left={caravan.left}
            onClick={() => handleRoomDetail(caravan.name)}
          >
            {selectedRoom === caravan.name && (
              <BsCheckLg
                style={{
                  color: baseStyle.mainColor,
                  transform: 'scale(3.0) translate(5px)',
                }}
              />
            )}
          </Caravan>
        );
      })}

      {/* 텐트 아이콘 */}
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
          </Tent>
        );
      })}

      {/* 글램핑 아이콘 */}
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
          </Glamp>
        );
      })}

      {/* 둘러보기 페이지일때만 객실상세 모달창이 뜨도록 하기위함 */}
      {location.pathname === '/site' && (
        <RoomModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          roomData={selectedRoom}
        />
      )}
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
