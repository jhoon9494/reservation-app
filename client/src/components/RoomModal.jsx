import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/modal.css';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import ChangeTitle from './ChangeTitle';
import ChangeContent from './ChangeContent';

export const RoomModal = ({ show, onHide, roomData }) => {
  const [currTitle, setCurrTitle] = useState('객실 설명');
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="my-modal"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Header>{roomData}</Header>

      <ImgContainer></ImgContainer>
      <ContentContainer>
        <ChangeTitle currTitle={currTitle} setCurrTitle={setCurrTitle} />
        <ChangeContent currTitle={currTitle} />
      </ContentContainer>
      <BtnContainer>
        {/* TODO 예약하기 버튼 클릭 시 pathname에 룸 명 넣어주고 예약페이지로 이동 후 해당페이지에서 객실별 booking api get으로 정보받아오기*/}
        <ReserveBtn>예약하기</ReserveBtn>
      </BtnContainer>
    </Modal>
  );
};

const Header = styled.div`
  width: 223px;
  font-size: ${baseStyle.titleFontSize};
  margin: 54px auto auto;
  text-align: center;
`;

const ImgContainer = styled.div`
  width: 432px;
  height: 229px;
  margin: 62px auto auto;
  background-color: #0000003b;
`;

const ContentContainer = styled.div`
  width: 432px;
  height: 260px;
  margin: 14px auto auto;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 68px;
`;

const ReserveBtn = styled(Button)`
  background-color: ${baseStyle.mainColor};
  width: 140px;
  margin-right: 82px;
  margin-bottom: 51px;
`;
