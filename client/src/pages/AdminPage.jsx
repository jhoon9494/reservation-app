/* eslint-disable */
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [management, setManagement] = useState('user');
  // console.log(management);
  const [userData, setUserData] = useState([]);
  const [bookData, setBookData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(8);

  useEffect(() => {
    const userUrl = 'http://localhost:3000/mock/userMock.json';
    const bookUrl = 'http://localhost:3000/mock/bookingMock.json';
    // const userList = axios.get(userUrl);
    const userList = fetch(userUrl, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .then(console.log(userData));

    const bookList = fetch(bookUrl, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setBookData(data))
      .then(console.log(bookData));
  }, []);

  const userManage = (e) => {
    e.preventDefault();
    setManagement('user');
  };

  const bookManage = (e) => {
    e.preventDefault();
    setManagement('book');
  };

  // pagination
  const indexOfLast = currentPage * dataPerPage;
  const indexOfFirst = indexOfLast - dataPerPage;
  const currentData = (data) => {
    let currentData = 0;
    currentData = data.slice(indexOfFirst, indexOfLast);
    return currentData;
  };

  return (
    <>
      <MainDiv>
        <ManageBar>
          <UserManage onClick={(e) => userManage(e)}>
            <ManageUserSpan management={management}>회원관리</ManageUserSpan>
          </UserManage>
          <BookManage onClick={(e) => bookManage(e)}>
            <ManageBookSpan management={management}>예약관리</ManageBookSpan>
          </BookManage>
          <NameInput placeholder="이름" />
          <SearchButton>검색</SearchButton>
        </ManageBar>
        {management == 'user' ? (
          <UserDiv>
            <UserBar>
              <UserBarSpan>이름</UserBarSpan>
              <UserBarSpan>E-Mail</UserBarSpan>
              <UserBarSpan>전화번호</UserBarSpan>
              <UserBarSpan>회원탈퇴</UserBarSpan>
            </UserBar>
            <UserLists>
              {userData.map((data) => {
                return (
                  <UserList key={data.ObjectId}>
                    <UserListSpan>{data.name}</UserListSpan>
                    <UserListSpan>{data.email}</UserListSpan>
                    <UserListSpan>{data.phone}</UserListSpan>
                    <DeleteUserBtn>회원 탈퇴</DeleteUserBtn>
                  </UserList>
                );
              })}
            </UserLists>
          </UserDiv>
        ) : (
          <BookDiv>
            <BookBar>
              <BookBarSpan>예약자</BookBarSpan>
              <BookBarSpan>연락처</BookBarSpan>
              <BookBarSpan>예약 기간</BookBarSpan>
              <BookBarSpan>객실명</BookBarSpan>
              <BookBarSpan>인원</BookBarSpan>
              <BookBarSpan>예약 상태</BookBarSpan>
            </BookBar>
            <BookLists>
              {bookData.map((data) => {
                return (
                  <BookList key={data.ObjectId}>
                    <BookListSpan>{data.name}</BookListSpan>
                    <BookListSpan>{data.phone}</BookListSpan>
                    <BookListSpan>{data.bookingDate}</BookListSpan>
                    <BookListSpan>{data.RoomID}</BookListSpan>
                    <BookListSpan>{data.peopleNum}명</BookListSpan>
                    <BookListSpan>
                      {data.state}{' '}
                      {data.state == '예약요청' ? (
                        <BookApproveBtn>예약 승인</BookApproveBtn>
                      ) : (
                        <BookCancelBtn>예약 취소</BookCancelBtn>
                      )}
                    </BookListSpan>
                  </BookList>
                );
              })}
            </BookLists>
          </BookDiv>
        )}
      </MainDiv>
    </>
  );
};

export default AdminPage;

const MainDiv = styled.div`
  // background-color: #eeeeee;
  // width: 1200px;
  // height: 100vh;
  // margin: auto;
`;

const ManageBar = styled.div`
  padding: 10px;
  width: 850px;
  height: 45px;
  // position: absolute;
  // left: 535px;
  // top: 187px;
  margin: auto;

  display: flex;
  align-items: center;
  border-bottom: 1px black solid;
`;

const UserManage = styled.div`
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

const ManageUserSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  padding: 0px 8px 6px 8px;
  border-bottom: ${(props) =>
    props.management == 'user' ? '3px #524fa1 solid' : ''};
`;

const ManageBookSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  padding: 0px 8px 6px 8px;
  border-bottom: ${(props) =>
    props.management == 'book' ? '3px #524fa1 solid' : ''};
`;

const NameInput = styled.input`
  width: 119px;
  height: 36px;
  border: 1px black solid;
  margin-left: auto;
  &::placeholder {
    color: rgba(82, 79, 161, 0.7);
    padding-left: 5px;
  }
`;

const SearchButton = styled.button`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: white;
  background-color: #524fa1;
  border: none;
  width: 71px;
  height: 36px;
  margin-left: 10px;
`;

const UserDiv = styled.div`
  width: 850px;
  height: 33px;
  // position: absolute;

  // left: 540px;
  // top: 293px;
  margin: auto;
  margin-top: 50px;
`;

const UserBar = styled.div`
  border-bottom: 1px solid #595959;
  display: flex;
`;

const UserBarSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  margin: auto;
  padding: 10px 0;
`;

const UserLists = styled.div`
  height: 400px;
`;
const UserList = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 65px;
  border-bottom: 1px solid black;
`;

const UserListSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  width: 65px;
  & + & {
    margin-left: 50px;
    width: 230px;
  }
  & + & + & {
    margin-left: 0px;
    width: 200px;
  }
`;
const DeleteUserBtn = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #ff0000;
  margin-left: 80px;
`;

const BookDiv = styled.div`
  width: 850px;
  height: 33px;

  // position: absolute;

  // left: 540px;
  // top: 293px;
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
  width: 50px;
  margin-left: 10px;
`;

const BookCancelBtn = styled.button`
  width: 50px;
  margin-left: 10px;
  background-color: yellow;
`;
