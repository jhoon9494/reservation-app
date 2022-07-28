import styled from 'styled-components';

const RoomDetailContent = ({ roomData }) => {
  return (
    <Container>
      <InfoContainer>
        <strong>ㅁ 입실시간 안내</strong>
        <span> - 입실시간 : 15:00 ~ 21:00</span>
        <span> - 퇴실시간 : 11:00</span>
      </InfoContainer>
      <InfoContainer>
        <strong>ㅁ 이용가능 인원</strong>
        <span> - 최소 인원 : {roomData.minPeople}인</span>
        <span> - 최대 인원 : {roomData.maxPeople}인</span>
      </InfoContainer>
      <InfoContainer>
        <strong>ㅁ 가격 안내</strong>
        <span> - 가격 : {roomData.price?.toLocaleString()}원</span>
      </InfoContainer>
      <InfoContainer>
        <strong>ㅁ 구비물품 및 안내사항</strong>
        {roomData.content?.split(',').map((item, idx) => (
          <span key={`${roomData._id}-${idx}`}> - {item}</span>
        ))}
      </InfoContainer>
    </Container>
  );
};

export default RoomDetailContent;

const Container = styled.div`
  width: 80%;
  text-align: left;
  padding: 10px;
  overflow-y: auto;
`;

const InfoContainer = styled.p`
  display: flex;
  flex-direction: column;
`;
