import styled from 'styled-components';

const RoomDetailContent = ({ roomData }) => {
  return (
    <Container>
      <p>
        <strong>ㅁ 입실시간 안내</strong>
        <div> - 입실시간 : 15:00 ~ 21:00</div>
        <div> - 퇴실시간 : 11:00</div>
      </p>
      <p>
        <strong>ㅁ 이용가능 인원</strong>
        <div> - 최소 인원 : {roomData.minPeople}인</div>
        <div> - 최대 인원 : {roomData.maxPeople}인</div>
      </p>
      <p>
        <strong>ㅁ 가격 안내</strong>
        <div> - 가격 : {roomData.price?.toLocaleString()}원</div>
      </p>
      <p>
        <strong>ㅁ 구비물품 및 안내사항</strong>
        {roomData.content?.split(',').map((item, idx) => (
          <div key={`${roomData._id}-${idx}`}> - {item}</div>
        ))}
      </p>
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
