import { useState, useEffect } from 'react';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { RoomDetail } from './RoomDetail';
import Modal from './Modal';
import { BsCheckLg } from 'react-icons/bs';
import axios from 'axios';
import InputComponent from './InputComponent';

const RoomsButton = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [allRooms, setAllRooms] = useState([]);

  // Mui 에러 관련 state
  const [roomType, setRoomType] = useState('');

  // 반응형
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [selectedRoomType, setSelectedRoomType] = useState('');

  const handleWindowSize = () => {
    // 반응형을 위한 브라우저 사이즈값 저장
    setWindowSize(window.innerWidth);
  };

  const handleRoomDetail = (roomId, roomType) => {
    setModalShow(true);
    setSelectedRoom(roomId);
    setSelectedRoomType(roomType);
    setRoomType(roomType);
  };

  // 전체 객실 정보 받아오기
  useEffect(() => {
    async function getAllRooms() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/room`
        );
        setAllRooms(res.data);
      } catch (e) {
        alert('객실정보를 받아올 수 없습니다.');
      }
    }
    getAllRooms();
  }, []);

  useEffect(() => {
    if (windowSize <= 768) {
      setSelectedRoom('');
    }

    setRoomType(selectedRoomType);
  }, [selectedRoomType]);

  // 반응형을 위한 브라우저 사이즈값 저장
  useEffect(() => {
    window.addEventListener('resize', handleWindowSize);
    return () => {
      // cleanUp
      window.removeEventListener('resize', handleWindowSize);
    };
  }, []);

  return (
    <>
      {allRooms.map((room) => {
        if (room.roomType === 'Caravan') {
          return (
            <Caravan
              key={room.name}
              top={room.position.top}
              right={room.position.right}
              onClick={() =>
                windowSize > 768 && handleRoomDetail(room._id, room.roomType)
              }
            >
              <img src={room.icon} alt={room.name} />
              {selectedRoom === room._id && <CheckRoom type={room.roomType} />}
            </Caravan>
          );
        }
        if (room.roomType === 'Tent') {
          return (
            <Tent
              key={room.name}
              top={room.position.top}
              right={room.position.right}
              onClick={() =>
                windowSize > 768 && handleRoomDetail(room._id, room.roomType)
              }
            >
              <img src={room.icon} alt={room.name} />
              {selectedRoom === room._id && <CheckRoom type={room.roomType} />}
            </Tent>
          );
        }
        if (room.roomType === 'Glamping') {
          return (
            <Glamp
              key={room.name}
              top={room.position.top}
              right={room.position.right}
              onClick={() =>
                windowSize > 768 && handleRoomDetail(room._id, room.roomType)
              }
            >
              <img src={room.icon} alt={room.name} />
              {selectedRoom === room._id && <CheckRoom type={room.roomType} />}
            </Glamp>
          );
        }
      })}
      {windowSize > 768 && (
        <Modal open={modalShow} close={() => setModalShow(false)}>
          <RoomDetail roomID={selectedRoom} windowSize={windowSize} />
        </Modal>
      )}
      <InputWrap>
        <InputComponent
          title={'객실타입'}
          contents={['Caravan', 'Tent', 'Glamping']}
          setSelectedValue={setSelectedRoomType}
          selectedValue={selectedRoomType}
        />
        <InputComponent
          title={'객실명'}
          contents={allRooms.filter((room) => room.roomType === roomType)}
          setSelectedValue={setSelectedRoom}
          selectedValue={selectedRoom}
        />
      </InputWrap>
      {windowSize <= 768 && selectedRoom && (
        <RoomDetail roomID={selectedRoom} windowSize={windowSize} />
      )}
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

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;

  @media (max-width: 768px) {
    visibility: visible;
  }
`;
