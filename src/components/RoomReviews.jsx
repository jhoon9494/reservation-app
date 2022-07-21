import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const RoomReviews = ({ roomID }) => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await axios.get('http://localhost:3000/mock/reviewMock.json');
      setContent(res.data.filter((data) => data.RoomID === roomID));
    }
    getData();
  }, []);
  return (
    <>
      <Header>
        <p>예약자</p>
        <p>평점</p>
        <p>후기 내용</p>
      </Header>
      {content.map((data, idx) => {
        return (
          <Container key={`${data.objectId} - ${idx}`}>
            <p>{data.author}</p>
            <p>{data.grade}</p>
            <p>{data.content}</p>
          </Container>
        );
      })}
    </>
  );
};

export default RoomReviews;

const Header = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-around;
  margin-top: 24px;
  padding: 0 12px;
  border-bottom: 1px solid black;

  & > p {
    flex-basis: 100px;
  }

  & > p:last-child {
    flex-basis: 350px;
  }
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  padding: 12px 11px;

  & > p {
    flex-basis: 100px;
  }

  & > p:last-child {
    flex-basis: 350px;
  }
`;
