import { useState } from 'react';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { RoomModal } from './RoomModal';
import { BsCheckLg } from 'react-icons/bs';

const RoomsButton = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleRoomDetail = (roomId) => {
    setModalShow(true);
    setSelectedRoom(roomId);
  };

  const caravans = [
    { top: 10, left: 32, name: 'C-101호', id: '62d8c299b2bc1fe681636cba' },
    { top: 15.3, left: 40.6, name: 'C-102호', id: '62d8c2d0b2bc1fe681636cbd' },
    { top: 21.3, left: 50, name: 'C-103호', id: '62d8c2d4b2bc1fe681636cc0' },
    { top: 27.7, left: 29, name: 'C-104호', id: '62d8c2d7b2bc1fe681636cc3' },
    { top: 84, left: 28, name: 'C-105호', id: '62d8c2e0b2bc1fe681636cc6' },
    { top: 80, left: 39.4, name: 'C-106호', id: '62d8c2e4b2bc1fe681636cc9' },
  ];

  const tents = [
    { top: 33.5, right: 42.5, name: 'T-201호', id: '62d8c3abb2bc1fe681636ccc' },
    { top: 33.3, right: 36.7, name: 'T-202호', id: '62d8c3aeb2bc1fe681636ccf' },
    { top: 32.8, right: 30.6, name: 'T-203호', id: '62d8c3b4b2bc1fe681636cd2' },
    { top: 32.5, right: 25, name: 'T-204호', id: '62d8c3b7b2bc1fe681636cd5' },
    { top: 45, right: 39.5, name: 'T-205호', id: '62d8c3bab2bc1fe681636cd8' },
    { top: 45, right: 34, name: 'T-206호', id: '62d8c3bdb2bc1fe681636cdb' },
    { top: 44.9, right: 27.6, name: 'T-207호', id: '62d8c3c2b2bc1fe681636cde' },
  ];

  const glamps = [
    { top: 55, right: 42, name: 'G-301호', id: '62d8c496b2bc1fe681636ce1' },
    { top: 55.5, right: 35, name: 'G-302호', id: '62d8c49ab2bc1fe681636ce4' },
    { top: 56, right: 29, name: 'G-303호', id: '62d8c49db2bc1fe681636ce7' },
    { top: 66.5, right: 44, name: 'G-304호', id: '62d8c4a0b2bc1fe681636cea' },
    { top: 66.8, right: 37.8, name: 'G-305호', id: '62d8c4a4b2bc1fe681636ced' },
    { top: 68.3, right: 31.3, name: 'G-306호', id: '62d8c4a7b2bc1fe681636cf0' },
    { top: 69.4, right: 25.1, name: 'G-307호', id: '62d8c4aab2bc1fe681636cf3' },
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
            onClick={() => handleRoomDetail(caravan.id)}
          >
            {selectedRoom === caravan.id && <CheckRoom />}
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
            onClick={() => handleRoomDetail(tent.id)}
          >
            {selectedRoom === tent.name && <CheckRoom />}
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
            onClick={() => handleRoomDetail(glamp.id)}
          >
            {selectedRoom === glamp.name && <CheckRoom />}
          </Glamp>
        );
      })}
      <RoomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        roomID={selectedRoom}
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

const CheckRoom = styled(BsCheckLg)`
  color: ${baseStyle.mainColor};
  transform: scale(3) translate(5px);
`;
