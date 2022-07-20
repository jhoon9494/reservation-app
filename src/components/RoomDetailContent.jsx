import styled from 'styled-components';

const RoomDetailContent = ({ roomData }) => {
  return (
    <Container>
      <p>{roomData[0]?.content}</p>
      <p>최소 인원 : {roomData[0]?.min_people}인</p>
      <p>최대 인원 : {roomData[0]?.max_people}인</p>
      <p>가격 : {roomData[0]?.price.toLocaleString()}원</p>
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
