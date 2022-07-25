import styled from 'styled-components';

const RoomDetailContent = ({ roomData }) => {
  return (
    <Container>
      <p>{roomData?.content}</p>
      <p>최소 인원 : {roomData.minPeople}인</p>
      <p>최대 인원 : {roomData.maxPeople}인</p>
      <p>가격 : {roomData.price?.toLocaleString()}원</p>
    </Container>
  );
};

export default RoomDetailContent;

const Container = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 28px 34px;
`;
