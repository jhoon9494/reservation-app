import { useState } from 'react';
import styled from 'styled-components';
import { RoomModal } from './RoomModal';

const RoomsButton = () => {
  const [modalShow, setModalShow] = useState(false);
  const [roomData, setRoomData] = useState('');
  const handleClick = (data) => {
    setModalShow(true);
    // 각 객실에 대한 api 호출
    setRoomData(data);
  };
  return (
    <>
      {/* 카라반 좌표  */}
      <Caravan top="24" left="23" onClick={() => handleClick('C-101호')} />
      <Caravan top="27" left="35" onClick={() => handleClick('C-102호')} />
      <Caravan top="31.5" left="48" onClick={() => handleClick('C-103호')} />
      <Caravan top="35.5" left="20" onClick={() => handleClick('C-104호')} />
      <Caravan top="72.5" left="18.5" onClick={() => handleClick('C-105호')} />
      <Caravan top="70" left="33.5" onClick={() => handleClick('C-106호')} />

      {/* 텐트 좌표 */}
      <Tent top="39.5" right="41.5" onClick={() => handleClick('T-201호')} />
      <Tent top="39.2" right="34" onClick={() => handleClick('T-202호')} />
      <Tent top="39" right="26" onClick={() => handleClick('T-203호')} />
      <Tent top="38.5" right="18.5" onClick={() => handleClick('T-204호')} />
      <Tent top="47" right="37.5" onClick={() => handleClick('T-205호')} />
      <Tent top="46.6" right="30" onClick={() => handleClick('T-206호')} />
      <Tent top="46.7" right="22" onClick={() => handleClick('T-207호')} />

      {/* 글램핑 좌표 */}
      <Glamp top="53" right="41" onClick={() => handleClick('G-301호')} />
      <Glamp top="53.5" right="32" onClick={() => handleClick('G-302호')} />
      <Glamp top="54" right="23.5" onClick={() => handleClick('G-303호')} />
      <Glamp top="60.8" right="44" onClick={() => handleClick('G-304호')} />
      <Glamp top="61.3" right="35.6" onClick={() => handleClick('G-305호')} />
      <Glamp top="62" right="27" onClick={() => handleClick('G-306호')} />
      <Glamp top="62.6" right="18.8" onClick={() => handleClick('G-307호')} />

      <RoomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        reserve={() => console.log('예약하기 클릭')}
        roomdata={roomData}
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
