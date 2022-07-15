import { useState } from 'react';
import styled from 'styled-components';
import { RoomModal } from './RoomModal';

const RoomsButton = () => {
  const [modalShow, setModalShow] = useState(false);
  const [roomData, setRoomData] = useState('');
  // TODO 함수명 수정하기
  const handleClick = (data) => {
    setModalShow(true);
    // TODO
    // 객실을 클릭했을 경우 객실정보를 받아오기 위해 api 호출?
    // 추후 객실 수정 등이 이루어질 수 있으므로, 디비에 저장하는게 맞고, 객실 수정할 수 있는 api를 만드는게 좋을 듯
    setRoomData(data);
  };
  return (
    <>
      {/* TODO 좌표값 JSON 배열로 만들어서 map 해주기 */}
      {/* 카라반 좌표  */}
      <Caravan top="10" left="32" onClick={() => handleClick('C-101호')} />
      <Caravan top="15.3" left="40.6" onClick={() => handleClick('C-102호')} />
      <Caravan top="21.3" left="50" onClick={() => handleClick('C-103호')} />
      <Caravan top="27.7" left="29" onClick={() => handleClick('C-104호')} />
      <Caravan top="84" left="28" onClick={() => handleClick('C-105호')} />
      <Caravan top="80" left="39.4" onClick={() => handleClick('C-106호')} />

      {/* 텐트 좌표 */}
      <Tent top="33.5" right="42.5" onClick={() => handleClick('T-201호')} />
      <Tent top="33.3" right="36.7" onClick={() => handleClick('T-202호')} />
      <Tent top="32.8" right="30.6" onClick={() => handleClick('T-203호')} />
      <Tent top="32.5" right="25" onClick={() => handleClick('T-204호')} />
      <Tent top="45" right="39.5" onClick={() => handleClick('T-205호')} />
      <Tent top="45" right="34" onClick={() => handleClick('T-206호')} />
      <Tent top="44.9" right="27.6" onClick={() => handleClick('T-207호')} />

      {/* 글램핑 좌표 */}
      <Glamp top="55" right="42" onClick={() => handleClick('G-301호')} />
      <Glamp top="55.5" right="35" onClick={() => handleClick('G-302호')} />
      <Glamp top="56" right="29" onClick={() => handleClick('G-303호')} />
      <Glamp top="66.5" right="44" onClick={() => handleClick('G-304호')} />
      <Glamp top="66.8" right="37.8" onClick={() => handleClick('G-305호')} />
      <Glamp top="68.3" right="31.3" onClick={() => handleClick('G-306호')} />
      <Glamp top="69.4" right="25.1" onClick={() => handleClick('G-307호')} />

      <RoomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        roomData={roomData}
      />
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
