import { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';
import MypageModal from '../components/MypageModal';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const MypageReservationCheck = () => {
  const [getBooking, setGetBooking] = useState([]);
  // const [getUser, setGetUser] = useState({});
  // console.log('getBooking : ', getBooking);

  // 페이징네이션
  const [totalPage, setTotalPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  // modal제어
  const [modalShow, setModalShow] = useState(false);
  // modal창에 넘길 값
  const [modalSelect, setModalSelect] = useState({
    option: '',
    width: 0,
    height: 0,
    room: '',
  });

  useEffect(() => {
    // 예약 리스트 요청
    async function fetchBooking() {
      try {
        const urlBookingList = `http://localhost:5000/api/booking/user?page=${currPage}&perPage=5`;
        const token = sessionStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(urlBookingList, config);
        // console.log(res.data);
        setGetBooking(res.data.bookingInfos);
        setTotalPage(res.data.totalPage);
      } catch (err) {
        console.log(err.response.data.reason);
      }
    }
    // 유저 정보 요청
    // async function fetchUser() {
    //   try {
    //     const urlUser = `http://localhost:5000/api/booking/user`;
    //     const token = sessionStorage.getItem('token');
    //     const config = {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };
    //     console.log('config:', config);

    //     const res = await axios.get(urlUser, config);

    //     console.log('페이징 됨', res);
    //     const getUsers = await res.data;
    //     setGetUser(() => ({ ...getUsers }));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // fetchUser();

    fetchBooking();
    // console.log(currPage);
  }, [currPage]);

  // '예약 상태'에 따라 '예약 취소' 버튼을 활성화 시킨다
  const checkingStatus = (status) => {
    if (status === '예약 취소' || status === '예약 완료') {
      return true;
    }
    return false;
  };

  const handlButton = (e) => {
    const text = e.target.innerText;
    switch (text) {
      case '예약 취소':
        // console.log('예약 취소');
        setModalSelect({
          option: 'ModalReservationCancellation',
          width: 600,
          height: 405,
          room: e.target.dataset.room,
          bookingid: e.target.dataset.bookingid,
        });
        setModalShow(true);
        break;
      case '후기 작성':
        // console.log('후기 작성');
        // console.log('e.target.dataset.name', e.target.dataset.username);
        setModalSelect({
          option: 'ModalWriteReview',
          width: 700,
          height: 500,
          bookingid: e.target.dataset.bookingid,
          roomid: e.target.dataset.roomid,
          userName: e.target.dataset.username,
        });
        setModalShow(true);
        break;
      case '후기 수정':
        // console.log('후기 수정');
        setModalSelect({
          option: 'ModalModifiedReview',
          width: 700,
          height: 500,
          bookingid: e.target.dataset.bookingid,
        });
        setModalShow(true);
        break;
      default:
      // console.log('버튼 클릭');
    }
  };

  // 최대 페이징네이션 계산
  const makePagination = () => {
    let startIndex = parseInt(currPage / 10);
    // currPage가 10의 배수인 경우에 버튼을 누르자마자 다음 페이지로 넘어가는 것을 방지하기 위함
    if (startIndex === currPage / 10) {
      console.log('startIndex', startIndex);
      startIndex -= 1;
    }
    const page = [];
    for (let i = startIndex * 10; i < (startIndex + 1) * 10; i++) {
      if (i === totalPage) break;
      page.push(i);
    }
    return page;
  };

  return (
    <>
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
        {getBooking.length > 0 ? (
          <>
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
                        data-room={list.roomID.name}
                        data-bookingid={list._id}
                        disabled={checkingStatus(list.status)}
                      >
                        예약 취소
                      </BookStateBtn>
                    </BookListSpan>
                    <BookListSpan>
                      <ReviewWriteBtn
                        onClick={handlButton}
                        data-bookingid={list._id}
                        data-roomid={list.roomID._id}
                        data-username={list.name}
                      >
                        {list.isReviewed ? '후기 수정' : '후기 작성'}
                      </ReviewWriteBtn>
                    </BookListSpan>
                  </BookListLi>
                );
              })}
            </BookListsUl>

            <ButtonContainer>
              <LeftArrow
                onClick={() =>
                  setCurrPage((curr) => {
                    if (curr > 1) return curr - 1;
                    else return 1;
                  })
                }
              />
              {makePagination().map((idx) => {
                return (
                  <PageNationBtn
                    key={`pagination-${idx}`}
                    onClick={() => {
                      setCurrPage(idx + 1);
                    }}
                    active={Number(currPage) === Number(idx + 1)}
                  >
                    {idx + 1}
                  </PageNationBtn>
                );
              })}
              <RigthArrow
                onClick={() =>
                  setCurrPage((curr) => {
                    if (curr < totalPage) return curr + 1;
                    else return totalPage;
                  })
                }
              />
            </ButtonContainer>
            <MypageModal
              modalShow={modalShow}
              setModalShow={() => setModalShow(false)}
              modalSelect={modalSelect}
            />
          </>
        ) : (
          <NonList>
            <h4>예약한 상품을 찾을 수 없습니다.</h4>
          </NonList>
        )}
      </ReservationCheckContainer>
    </>
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
  margin-bottom: 50px;
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
  :disabled {
    border: 1px solid #d9d9d9;
    background-color: #d9d9d9;
  }
`;

const ReviewWriteBtn = styled.button`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  box-sizing: border-box;
  color: ${(props) => {
    if (props.children === '후기 수정') {
      return baseStyle.mainColor;
    }
    return '#fff';
  }};
  background-color: ${(props) => {
    if (props.children === '후기 수정') {
      return 'transparent';
    }
    return baseStyle.mainColor;
  }};
  border: 1px solid ${baseStyle.mainColor};
  width: 100px;
  height: 30px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

const LeftArrow = styled(VscChevronLeft)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  box-sizing: content-box;
  border: 1px solid white;
  :hover {
    border-radius: 8px;
    border: 1px solid ${baseStyle.mainColor};
    background-color: transparent;
  }
`;

const RigthArrow = styled(VscChevronRight)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  box-sizing: content-box;
  border: 1px solid white;
  :hover {
    border-radius: 8px;
    border: 1px solid ${baseStyle.mainColor};
    background-color: transparent;
  }
`;

const PageNationBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 4px 12px;

  ${(props) =>
    props.active &&
    css`
      background-color: ${baseStyle.mainColor};
      color: white;
      border-radius: 8px;
    `}
`;

const NonList = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  & h4 {
    display: block;
    padding-top: 50px;
  }
`;
