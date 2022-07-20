import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/modal.css';
import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';
import RoomTabs from './RoomTabs';
import RoomDetailContent from './RoomDetailContent';
import RoomReviews from './RoomReviews';
import axios from 'axios';

export const RoomModal = ({ show, onHide, roomID }) => {
  const [currTab, setCurrTab] = useState('객실 설명');
  const [roomContent, setRoomContent] = useState([]);
  const [imgZoom, setImgZoom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      // RoomsButton 컴포넌트에서 초기 roomID값은 empty string임.
      // roomID에 값이 들어올때만 api 요청
      if (roomID !== '') {
        const res = await axios.get(
          'http://localhost:3000/mock/roomsMock.json'
        );
        setRoomContent(res.data.filter((room) => room.name === roomID));
      }
    }
    getData();
  }, [roomID]);

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        // 모달창을 종료하고 다시 켰을 때 모달창 내부 초기화
        setCurrTab('객실 설명');
        setImgZoom(false);
      }}
      dialogClassName="my-modal"
      aria-labelledby="roomTitle"
      centered
    >
      <Header id="roomTitle">{roomContent[0]?.name}</Header>
      {/* TODO 이미지 캐러셀로 슬라이드 구현 */}
      <ImgContainer onClick={() => setImgZoom((prev) => !prev)}>
        {/* roomContent의 초기값은 빈 배열이므로 인덱스를 통해 접근할 수 없음.
        객실을 선택하여 roomID에 값이 들어가야만 인덱스를 통해 접근 할 수 있음.
        값이 없을 경우 undefined를 반환하여 에러를 발생하지 않도록 옵셔널 체이닝(?.)을 사용 */}
        <Image
          src={roomContent[0]?.img_src}
          alt={roomContent[0]?.name}
          zoom={imgZoom}
        />
      </ImgContainer>
      <ContentContainer>
        <RoomTabs currTab={currTab} setCurrTab={setCurrTab} />
        {currTab === '객실 설명' ? (
          <RoomDetailContent roomData={roomContent} />
        ) : (
          <RoomReviews roomID={roomContent[0]?.objectID} />
        )}
      </ContentContainer>

      <ReserveBtn onClick={() => navigate(`/reservation/${roomID}`)}>
        예약하기
      </ReserveBtn>
    </Modal>
  );
};

const Header = styled.div`
  width: 222px;
  font-size: ${baseStyle.titleFontSize};
  margin: 54px auto auto;
  text-align: center;
`;

const ImgContainer = styled.div`
  width: 480px;
  height: 286px;
  margin: 21px auto auto;
  background-color: #0000003b;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  transition: all ease 500ms 0ms;
  ${(props) =>
    props.zoom &&
    css`
      transform: scale(2) translate(0, 50px);
    `}
`;

const ContentContainer = styled.div`
  width: 570px;
  height: 388px;
  margin: 23px auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReserveBtn = styled(Button)`
  display: block;
  background-color: ${baseStyle.mainColor};
  width: 140px;
  margin: 17px auto 38px;
`;
