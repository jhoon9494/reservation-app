import { useState } from 'react';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import MypageModal from '../components/MypageModal';

const MypageReservationCheck = (props) => {
  const getBooking = props.getBooking;

  // modal제어
  const [modalShow, setModalShow] = useState(false);
  // modal창에 넘길 값
  const [modalSelect, setModalSelect] = useState({
    option: '',
    width: 0,
    height: 0,
    room: '',
  });

  // '예약 상태'에 따라 '예약 취소' 버튼을 활성화 시킨다
  const checkingStatus = (status) => {
    if (status === '예약 취소' || status === '예약 완료') {
      return false;
    }
    return true;
  };

  const handlButton = (e) => {
    const text = e.target.innerText;
    switch (text) {
      case '예약 취소':
        console.log('예약 취소');
        // console.log(e.target.dataset.room);
        setModalSelect({
          option: 'ModalReservationCancellation',
          width: 600,
          height: 405,
          room: e.target.dataset.room,
        });
        setModalShow(true);
        break;
      case '후기 작성':
        console.log('후기 작성');
        setModalSelect({
          option: 'ModalWriteReview',
          width: 700,
          height: 500,
        });
        setModalShow(true);
        break;
      case '후기 수정':
        console.log('후기 수정');
        setModalSelect({
          option: 'ModalModifiedReview',
          width: 700,
          height: 500,
          // booking: bookingId,
        });

        setModalShow(true);
        break;
      default:
        console.log('버튼 클릭');
    }
  };

  // TODO : 조건에 따른 버튼 생성
  // TODO : 각 필요한 데이터, 예약 Obj id라던지 넘기기

  return (
    <ReservationCheckContainer>
      <BookBarContainerDiv>
        <BookBarUnderlineDiv>
          <BookBarSpan>예약기간</BookBarSpan>
          <BookBarSpan>객실명</BookBarSpan>
          <BookBarSpan>인원</BookBarSpan>
          <BookBarSpan>가격</BookBarSpan>
          <BookBarSpan>예약 상태</BookBarSpan>
          <BookBarSpan></BookBarSpan>
          <BookBarSpan></BookBarSpan>
        </BookBarUnderlineDiv>
      </BookBarContainerDiv>
      <BookListsUl>
        {getBooking.map((list, i) => {
          return (
            <BookListLi key={`${list._id}-${i}`}>
              <BookListSpan>{`${list.startDate.substring(
                0,
                10
              )} ~ ${list.endDate.substring(0, 10)}`}</BookListSpan>
              <BookListSpan>{list.roomID.name}</BookListSpan>
              <BookListSpan>{list.peopleNumber}</BookListSpan>
              <BookListSpan>{list.price}</BookListSpan>
              <BookListSpan>{list.status}</BookListSpan>
              <BookListSpan>
                <BookStateBtn
                  onClick={handlButton}
                  data-roomID={list.roomID}
                  disabled={checkingStatus(list.status)}
                >
                  예약 취소
                </BookStateBtn>
              </BookListSpan>
              <BookListSpan onClick={handlButton}>
                <ReviewWriteBtn onClick={handlButton}>
                  {list.isReviewed ? '후기 작성' : '후기 수정'}
                </ReviewWriteBtn>
              </BookListSpan>
            </BookListLi>
          );
        })}
      </BookListsUl>
      <MypageModal
        modalShow={modalShow}
        setModalShow={() => setModalShow(false)}
        modalSelect={modalSelect}
      />
      <div>페이징네이션</div>
    </ReservationCheckContainer>
  );
};

export default MypageReservationCheck;

const ReservationCheckContainer = styled.div`
  margin: 100px auto;
  width: 1110px;
`;

const BookBarContainerDiv = styled.div``;
const BookBarUnderlineDiv = styled.div`
  border-bottom: 1px solid #000;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding-bottom: 10px;
`;
const BookBarSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin: auto;
  & {
    margin: auto;
  }
`;

const BookListsUl = styled.ul`
  margin-top: 15px;
  margin-bottom: 170px;
  padding-left: 0;
`;

const BookListLi = styled.li`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding-bottom: 20px;
`;

const BookListSpan = styled.span`

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  margin: auto;
  & + &{
  }
}
`;
// ${(props) => {
//   console.log(props);
//   // console.log(props.children.props.children);
// }}
const BookStateBtn = styled.button`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  box-sizing: border-box;
  color: ${baseStyle.mainColor};
  background-color: transparent;
  border: 1px solid #ff0000;
  width: 100px;
  height: 30px;
`;

const ReviewWriteBtn = styled.button`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  box-sizing: border-box;
  color: #fff;
  background-color: ${baseStyle.mainColor};
  border: 1px solid ${baseStyle.mainColor};
  width: 100px;
  height: 30px;
`;
