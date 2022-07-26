/* eslint-disable */

import styled from 'styled-components';
import axios from 'axios';
// 예약 리스트
export const ShowBookExceptRequests = ({ data, setChangeBookStatus }) => {
  // 예약 취소 함수
  async function bookCancel(e) {
    e.preventDefault();

    if (window.confirm(`${data.name} 예약자 님의 예약을 취소 하시겠습니까?`)) {
      try {
        await axios.patch('http://localhost:5000/api/admin/book', {
          data: {
            bookingID: data._id,
            status: '예약 취소',
          },
        });
      } catch (e) {
        alert('예약 취소에 실패하였습니다.');
        console.log(e.response.data);
        return;
      }
      alert(`${data.name} 예약자님의 예약을 취소 하였습니다.`);
      setChangeBookStatus((current) => !current);
    }
  }

  return (
    <BookList>
      <BookListSpan>{data.name}</BookListSpan>
      <BookListSpan>{data.phoneNumber}</BookListSpan>
      <BookListSpan>
        {data.processDate[0].substring(0, 10)}
        {' ~ '}
        {data.processDate[data.processDate.length - 1].substring(0, 10)}
      </BookListSpan>
      <BookListSpan>{data.roomID.name}</BookListSpan>
      <BookListSpan>{data.peopleNumber}명</BookListSpan>
      <BookListSpan>
        {data.status === '예약 완료' ? (
          <>
            {data.status}
            <BookCancelBtn onClick={(e) => bookCancel(e)}>
              예약 취소
            </BookCancelBtn>
          </>
        ) : data.status === '예약 취소 요청' ? (
          <>
            {data.status}
            <BookCancelBtn onClick={(e) => bookCancel(e)}>
              예약 취소
            </BookCancelBtn>
          </>
        ) : (
          <>{data.status}됨</>
        )}
      </BookListSpan>
    </BookList>
  );
};

const BookListSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1.5fr 0.5fr 0.5fr 1fr;
  grid-template-rows: 1fr;
  border-bottom: 1px solid black;
  height: 60px;
`;

const BookCancelBtn = styled.button`
  width: 40px;
  margin-left: 10px;
  background-color: yellow;
  border: 0px;
`;
