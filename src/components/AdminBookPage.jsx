import { ShowBookRequests } from '../components/ShowBookRequests';
import { ShowBookExceptRequests } from './ShowBookExceptRequests';
import styled from 'styled-components';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';

export const AdminBookPage = ({
  filteredBookData,
  filteredBookRequestsData,
  setFilteredBookData,
  setFilteredBookRequestsData,
  setChangeBookStatus,
  setCurrentPage,
  pageCount,
  bookData,
  bookRequestsData,
  currentPage,
  dataPerPage,
  currentData,
  setSearchingName,
}) => {
  const [bookMenu, setBookmenu] = useState('approve');

  const changeApproveMenu = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setBookmenu('approve');
  };
  const changeManageMenu = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setBookmenu('manage');
  };

  return (
    <BookWrap>
      <BookManageBar>
        <BookApprove onClick={(e) => changeApproveMenu(e)}>
          <ApproveSpan
            bookMenu={bookMenu}
            onClick={() => {
              setSearchingName('');
              setFilteredBookData('');
              setFilteredBookRequestsData('');
            }}
          >
            예약 요청 관리
          </ApproveSpan>
        </BookApprove>
        <BookManage onClick={(e) => changeManageMenu(e)}>
          <ManageSpan
            bookMenu={bookMenu}
            onClick={() => {
              setSearchingName('');
              setFilteredBookData('');
              setFilteredBookRequestsData('');
            }}
          >
            예약 조회
          </ManageSpan>
        </BookManage>
      </BookManageBar>

      <BookBar>
        <BookBarSpan>예약자</BookBarSpan>
        <BookBarSpan>연락처</BookBarSpan>
        <BookBarSpan>예약 기간</BookBarSpan>
        <BookBarSpan>객실명</BookBarSpan>
        <BookBarSpan>인원</BookBarSpan>
        <BookBarSpan>예약 상태</BookBarSpan>
      </BookBar>
      {bookMenu == 'approve' ? (
        <BookLists>
          {filteredBookRequestsData == ''
            ? currentData(bookRequestsData).map((data, index) => {
                return (
                  <ShowBookRequests
                    key={index}
                    data={data}
                    setChangeBookStatus={setChangeBookStatus}
                  />
                );
              })
            : currentData(filteredBookRequestsData).map((data, index) => {
                return (
                  <ShowBookRequests
                    key={index}
                    data={data}
                    setChangeBookStatus={setChangeBookStatus}
                  />
                );
              })}
        </BookLists>
      ) : (
        <BookLists>
          {filteredBookData == ''
            ? currentData(bookData).map((data, index) => {
                return (
                  <ShowBookExceptRequests
                    key={index}
                    data={data}
                    setChangeBookStatus={setChangeBookStatus}
                  />
                );
              })
            : currentData(filteredBookData).map((data, index) => {
                return (
                  <ShowBookExceptRequests
                    key={index}
                    data={data}
                    setChangeBookStatus={setChangeBookStatus}
                  />
                );
              })}
        </BookLists>
      )}

      <PageWrap>
        <ArrowButton
          disabled={currentPage == 1}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage((current) => current - 1);
          }}
        >
          <FiArrowLeft /> 이전
        </ArrowButton>

        {bookMenu == 'approve'
          ? filteredBookRequestsData == ''
            ? pageCount(bookRequestsData)
            : pageCount(filteredBookRequestsData)
          : filteredBookData == ''
          ? pageCount(bookData)
          : pageCount(filteredBookData)}
        <ArrowButton
          style={{ marginLeft: '15px' }}
          disabled={
            bookMenu == 'approve'
              ? filteredBookRequestsData == ''
                ? currentPage ==
                  Math.ceil(bookRequestsData.length / dataPerPage)
                : currentPage ==
                  Math.ceil(filteredBookRequestsData.length / dataPerPage)
              : filteredBookData == ''
              ? currentPage == Math.ceil(bookData.length / dataPerPage)
              : currentPage == Math.ceil(filteredBookData.length / dataPerPage)
          }
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage((current) => current + 1);
          }}
        >
          다음 <FiArrowRight />
        </ArrowButton>
      </PageWrap>
    </BookWrap>
  );
};

const BookWrap = styled.div`
  width: 850px;
  height: 33px;
  margin: auto;
  margin-top: 50px;
`;

const BookBar = styled.div`
  border-bottom: 1px solid #595959;
  display: flex;
`;

const BookBarSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  margin: auto;
  padding: 10px 0;
`;

const BookLists = styled.div`
  height: 400px;
`;

const PageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const ArrowButton = styled.button`
  margin: ${(props) => (props.flip ? '0 0 0 16px !important' : '0 16px 0 0')};
  border: none;
  background-color: white;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    display: block;
  }
`;

const BookManageBar = styled.div`
  padding: 10px;
  width: 850px;
  height: 45px;
  margin: auto;
  display: flex;
  align-items: center;
`;

const BookApprove = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  height: 30px;
  border-right: 1px solid black;
  padding-right: 10px;
  :hover {
    cursor: pointer;
  }
`;

const BookManage = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  height: 30px;
  padding-left: 10px;
  :hover {
    cursor: pointer;
  }
`;

const ApproveSpan = styled.span`
  color: ${(props) => {
    return props.bookMenu == 'approve' ? 'red' : 'gray';
  }};
`;
const ManageSpan = styled.span`
  color: ${(props) => {
    return props.bookMenu == 'approve' ? 'gray' : 'red';
  }};
`;
