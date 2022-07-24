import styled from 'styled-components';
import moment from 'moment';
import baseStyle from '../styles/baseStyle';

const ReserveRoomInfo = ({ roomData }) => {
  return (
    <>
      <h2>예약 상품 정보</h2>
      <RoomBox>
        <RoomImg src={roomData.roomImg} alt={roomData.roomName} />
        <RoomInfo>
          <p>{roomData.roomName}</p>
          <p>인원 : {roomData.people}인</p>
          <p>
            일정 : {moment(roomData.startDate).format('YY-MM-DD')} ~
            {moment(roomData.endDate).format('YY-MM-DD')}
          </p>
        </RoomInfo>
      </RoomBox>
    </>
  );
};

export default ReserveRoomInfo;

const RoomBox = styled.div`
  display: flex;
  margin-top: 13px;
`;

const RoomImg = styled.img`
  display: block;
  width: 87px;
  height: 87px;
  border: 1px solid black;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 9px;

  > p {
    padding: 5px;
    margin: 0;
    font-size: ${baseStyle.contentFontSize};
  }
`;
