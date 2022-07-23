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
      await axios.patch('http://localhost:5000/api/admin/book', {
        data: {
          bookingID: data._id,
          status: '예약 완료',
        },
      });
      alert(`${data.name} 예약자님의 예약을 승인 하였습니다.`);
      setChangeBookStatus((current) => !current);
    }
  }

  async function bookCancel(e) {
    e.preventDefault();

    if (window.confirm(`${data.name} 예약자 님의 예약을 취소 하시겠습니까?`)) {
      await axios.patch('http://localhost:5000/api/admin/book', {
        data: {
          bookingID: data._id,
          status: '예약 취소',
        },
      });
      alert(`${data.name} 예약자님의 예약을 취소 하였습니다.`);
      setChangeBookStatus((current) => !current);
    }
  }

  return (
    <BookList key={data.ObjectId}>
      <BookListSpan>{data.name}</BookListSpan>
      <BookListSpan>{data.phoneNumber}</BookListSpan>
      <BookListSpan>
        {data.processDate[0].substring(0, 10)}{' '}
        {data.processDate[data.processDate.length - 1].substring(0, 10)}
      </BookListSpan>
      <BookListSpan>{data.roomID.name}</BookListSpan>
      <BookListSpan>{data.peopleNumber}명</BookListSpan>
      <BookListSpan>
        <BookApproveBtn onClick={(e) => bookApprove(e)}>
          예약 승인
        </BookApproveBtn>
        <BookCancelBtn onClick={(e) => bookCancel(e)}>예약 취소</BookCancelBtn>
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
  width: 80px;
  & + & {
    margin-left: 45px;

    width: 230px;
  }
  & + & + & {
    margin-left: 30px;

    width: 200px;
  }
  & + & + & + & {
    margin-left: 25px;
    width: 200px;
  }
  & + & + & + & + & {
    margin-left: 15px;
    margin-right: 15px;
    width: 200px;
  }
`;

const BookList = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 45px;
  border-bottom: 1px solid black;
`;

const BookApproveBtn = styled.button`
  width: 70px;
  margin-left: 10px;
`;

const BookCancelBtn = styled.button`
  width: 70px;
  margin-left: 10px;
  background-color: yellow;
`;
