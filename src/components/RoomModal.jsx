import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/modal.css';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import ChangeTitle from './ChangeTitle';
import ChangeContent from './ChangeContent';

export const RoomModal = ({ show, onHide, roomData }) => {
  const [currTitle, setCurrTitle] = useState('객실 설명');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/site/${roomData}`);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="my-modal"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Header>{roomData}</Header>
      {/* TODO 이미지 캐러셀로 슬라이드 구현 */}
      <ImgContainer></ImgContainer>
      <ContentContainer>
        <ChangeTitle currTitle={currTitle} setCurrTitle={setCurrTitle} />
        <ChangeContent currTitle={currTitle} roomData={roomData} />
      </ContentContainer>

      {/* 버튼 클릭 시 pathParams에 객실ID 넣어주고 예약페이지로 이동
        TODO 예약페이지에서 객실ID별로 booking api get으로 정보받아오기 */}
      <ReserveBtn onClick={handleClick}>예약하기</ReserveBtn>
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

const ContentContainer = styled.div`
  width: 570px;
  height: 388px;
  margin: 23px auto auto;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  align-items: center;
`;

const ReserveBtn = styled(Button)`
  display: block;
  background-color: ${baseStyle.mainColor};
  width: 140px;
  margin: 17px auto 38px;
`;
