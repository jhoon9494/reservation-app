import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal';
import { useState } from 'react';
// 예약 리스트
export const ShowBookRequests = ({ data, setChangeBookStatus }) => {
  const [modalShow, setModalShow] = useState(false);
  // 예약 승인 함수
  async function bookApprove(e) {
    e.preventDefault();

    if (
      window.confirm(`${data.name} 예약자 님의 예약 요청을 승인 하시겠습니까?`)
    ) {
      try {
        await axios.patch(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/admin/book`,
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
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/admin/book`,
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
  const showModal = () => {
    setModalShow(true);
  };

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
        <RequireBtn
          onClick={() => {
            showModal();
          }}
        >
          요청사항
        </RequireBtn>
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
      <Modal open={modalShow} close={() => setModalShow(false)}>
        <RequireDiv>
          <RequireP>요청사항</RequireP>
          <RequireContentDiv>
            {data.requirements !== '' ? (
              <RequireContentSpan>{data.requirements}</RequireContentSpan>
            ) : (
              <RequireContentSpan>요청 사항이 없습니다.</RequireContentSpan>
            )}
          </RequireContentDiv>
        </RequireDiv>
      </Modal>
    </BookList>
  );
};

const BookListSpan = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookList = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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

const RequireBtn = styled.button`
  width: 50px;
  margin-left: 10px;
  background-color: pink;
  border: 0px;
`;

const RequireDiv = styled.div`
  width: 300px;
  height: 300px;
`;

const RequireP = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const RequireContentDiv = styled.div`
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  padding-top: 10px;
`;

const RequireContentSpan = styled.span`
  font-size: 15px;
`;
