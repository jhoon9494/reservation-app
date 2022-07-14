import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/modal.css';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import ChangeTitle from './ChangeTitle';

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
        {/* TODO ChangeContent 컴포넌트 생성해서 본문 컴포넌트 별도 관리하기 */}
      </ContentContainer>
      <BtnContainer>
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
  justify-content: center;
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
