import { useState, useEffect } from 'react';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { caravans, tents, glamps } from '../styles/roomsCoordinate';
import { RoomDetail } from './RoomDetail';
import Modal from './Modal';
import { BsCheckLg } from 'react-icons/bs';
import axios from 'axios';

const RoomsButton = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [allRooms, setAllRooms] = useState([]);

  // 전체 객실 정보 받아오기
  useEffect(() => {
    async function getAllRooms() {
      const res = await axios.get('http://localhost:5000/api/room');
      setAllRooms(res.data);
    }
    getAllRooms();
  }, []);

  const handleRoomDetail = (roomId) => {
    setModalShow(true);
    setSelectedRoom(roomId);
  };

  return (
    <>
      {allRooms.map((room) => {
        if (room.name[0] === 'C') {
          return (
            <Caravan
              key={room.name}
              top={caravans[room.name].top}
              left={caravans[room.name].left}
              onClick={() => handleRoomDetail(room._id)}
            >
              {selectedRoom === room._id && <CheckRoom />}
            </Caravan>
          );
        }
        if (room.name[0] === 'T') {
          return (
            <Tent
              key={room.name}
              top={tents[room.name].top}
              right={tents[room.name].right}
              onClick={() => handleRoomDetail(room._id)}
            >
              {selectedRoom === room._id && <CheckRoom />}
            </Tent>
          );
        }
        if (room.name[0] === 'G') {
          return (
            <Glamp
              key={room.name}
              top={glamps[room.name].top}
              right={glamps[room.name].right}
              onClick={() => handleRoomDetail(room._id)}
            >
              {selectedRoom === room._id && <CheckRoom />}
            </Glamp>
          );
        }
      })}
      <Modal open={modalShow} close={() => setModalShow(false)}>
        <RoomDetail roomID={selectedRoom} />
      </Modal>
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
