import styled from 'styled-components';
import axios from 'axios';
// 예약 리스트
export const ShowBookRequests = ({ data, setChangeBookStatus }) => {
  // 예약 승인 함수
  async function bookApprove(e) {
    e.preventDefault();

    if (
      window.confirm(`${data.name} 예약자 님의 예약 요청을 승인 하시겠습니까?`)
    ) {
      try {
        await axios.patch(
          'http://kdt-sw2-busan-team03.elicecoding.com:5000/api/admin/book',
          {
            data: {
              bookingID: data._id,
              status: '예약 완료',
            },
          },
          {
            withCredentials: true,
          }
        );
      } catch (e) {
        alert('예약 승인에 실패하였습니다.');
        console.log(e.response.data);
        return;
      }
      alert(`${data.name} 예약자님의 예약을 승인 하였습니다.`);
      setChangeBookStatus((current) => !current);
    }
  }

  async function bookCancel(e) {
    e.preventDefault();

    if (window.confirm(`${data.name} 예약자 님의 예약을 취소 하시겠습니까?`)) {
      try {
        await axios.delete(
          'http://kdt-sw2-busan-team03.elicecoding.com:5000/api/admin/book',
          {
            data: {
              bookingID: data._id,
            },
            withCredentials: true,
          }
        );
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
        {data.startDate.substring(0, 10)}
        {' ~ '}
        {data.endDate.substring(0, 10)}
      </BookListSpan>
      <BookListSpan>{data.roomID.name}</BookListSpan>
      <BookListSpan>{data.peopleNumber}명</BookListSpan>
      <BookListSpan>
        {data.status === '예약 요청' ? (
          <BookApproveBtn onClick={(e) => bookApprove(e)}>
            예약 승인
          </BookApproveBtn>
        ) : (
          <BookCancelBtn onClick={(e) => bookCancel(e)}>
            예약 취소
          </BookCancelBtn>
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
`;

const BookList = styled.div`
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 0.5fr 1fr 1.5fr 0.5fr 0.5fr 1fr;
  grid-template-rows: 1fr;
  margin: auto;
  padding: 10px 0px;
`;

const BookApproveBtn = styled.button`
  width: 50px;
  margin-left: 10px;
  border: 0px;
`;

const BookCancelBtn = styled.button`
  width: 50px;
  margin-left: 10px;
  background-color: yellow;
  border: 0px;
`;
