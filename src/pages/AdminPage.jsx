/* eslint-disable */
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import { AdminUserPage } from '../components/AdminUserPage';
import { AdminBookPage } from '../components/AdminBookPage';
import { useNavigate } from 'react-router-dom';

// 관리자 페이지
const AdminPage = () => {
  const [management, setManagement] = useState('user');
  const [userData, setUserData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [bookRequestsData, setBookRequestsData] = useState([]);
  const [searchingName, setSearchingName] = useState('');
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [filteredBookData, setFilteredBookData] = useState([]);
  const [filteredBookRequestsData, setFilteredBookRequestsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(6);
  const [deleteUser, setDeleteUser] = useState(false);
  const [changeBookStatus, setChangeBookStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCookieValue = (name) =>
      document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() ||
      '';
    if (getCookieValue('userRole') !== 'admin') {
      navigate('/');
    }
  }, []);

  // 첫 유저 데이터
  useEffect(() => {
    async function getUserList() {
      const userData = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/admin/users`,
        { withCredentials: true }
      );
      const userList = userData.data;
      setUserData(userList);
    }
    getUserList();
  }, [deleteUser]);

  // 첫 예약 데이터
  useEffect(() => {
    async function getBookList() {
      const bookData = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/admin/books`,
        {
          params: { request: false },
          withCredentials: true,
        }
      );
      const bookList = bookData.data;
      setBookData(bookList);
    }
    getBookList();

    async function getBookRequestsList() {
      const bookRequestsData = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/admin/books`,
        {
          params: { request: true },
          withCredentials: true,
        }
      );
      const bookRequestsList = bookRequestsData.data;
      setBookRequestsData(bookRequestsList);
    }
    getBookRequestsList();
  }, [changeBookStatus]);

  const userManage = (e) => {
    e.preventDefault();
    setManagement('user');
  };

  const bookManage = (e) => {
    e.preventDefault();
    setManagement('book');
  };

  // 이름으로 찾기
  const searchByName = (e) => {
    if (management === 'user') {
      // 유저 데이터
      async function findUsersByName() {
        const userData = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/admin/user`,
          {
            params: { name: searchingName },
            withCredentials: true,
          }
        );
        const userList = userData.data;
        setFilteredUserData(userList);
      }
      findUsersByName();
      setCurrentPage(1);
    } else {
      // 예약 데이터
      const oldBookData = [...bookData];
      const newBookData = oldBookData.filter((data) => {
        return data.name == searchingName;
      });
      setFilteredBookData(newBookData);

      const oldBookRequestsData = [...bookRequestsData];
      const newBookRequestsData = oldBookRequestsData.filter((data) => {
        return data.name == searchingName;
      });
      setFilteredBookRequestsData(newBookRequestsData);
      setCurrentPage(1);
    }
  };

  // pagination
  const indexOfLast = currentPage * dataPerPage;
  const indexOfFirst = indexOfLast - dataPerPage;
  const currentData = (data) => {
    let currentData = 0;
    currentData = data.slice(indexOfFirst, indexOfLast);
    return currentData;
  };
  const pageCount = (data) => {
    const pageCounts = [];
    let totalPage = Math.ceil(data.length / dataPerPage);
    let startIndex = parseInt(currentPage / 10);

    if (startIndex === currentPage / 10) {
      startIndex -= 1;
    }

    for (let i = startIndex * 10; i < (startIndex + 1) * 10; i++) {
      if (i === totalPage) break;
      pageCounts.push(
        <PageButton
          key={i}
          active={currentPage === i + 1}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(i + 1);
          }}
        >
          {i + 1}
        </PageButton>
      );
    }
    return pageCounts;
  };

  return (
    <>
      <Container>
        <Body>
          <ManageBar>
            <UserManage onClick={(e) => userManage(e)}>
              <ManageUserSpan
                management={management}
                onClick={() => {
                  setSearchingName('');
                  setFilteredUserData('');
                  setCurrentPage(1);
                }}
              >
                회원관리
              </ManageUserSpan>
            </UserManage>
            <BookManage onClick={(e) => bookManage(e)}>
              <ManageBookSpan
                management={management}
                onClick={() => {
                  setSearchingName('');
                  setFilteredBookData('');
                  setFilteredBookRequestsData('');
                  setCurrentPage(1);
                }}
              >
                예약관리
              </ManageBookSpan>
            </BookManage>
            <NameInput
              placeholder="이름"
              value={searchingName}
              onChange={(e) => setSearchingName(e.target.value)}
            />
            <SearchButton onClick={(e) => searchByName(e)}>검색</SearchButton>
          </ManageBar>
          {management === 'user' ? (
            <AdminUserPage
              filteredUserData={filteredUserData}
              setDeleteUser={setDeleteUser}
              setCurrentPage={setCurrentPage}
              pageCount={pageCount}
              userData={userData}
              currentData={currentData}
              currentPage={currentPage}
              dataPerPage={dataPerPage}
            />
          ) : (
            <AdminBookPage
              filteredBookData={filteredBookData}
              filteredBookRequestsData={filteredBookRequestsData}
              setFilteredBookData={setFilteredBookData}
              setFilteredBookRequestsData={setFilteredBookRequestsData}
              setChangeBookStatus={setChangeBookStatus}
              setCurrentPage={setCurrentPage}
              pageCount={pageCount}
              bookData={bookData}
              bookRequestsData={bookRequestsData}
              currentPage={currentPage}
              dataPerPage={dataPerPage}
              currentData={currentData}
              setSearchingName={setSearchingName}
            />
          )}
        </Body>
      </Container>
    </>
  );
};

export default AdminPage;

const Container = styled.main`
  margin-top: 30px;
`;
const Body = styled.div`
  height: 62vh;
`;

const ManageBar = styled.div`
  padding: 10px;
  width: 850px;
  height: 45px;
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
    props.management == 'user' ? '3px #8AA8CD solid' : ''};
`;

const ManageBookSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  padding: 0px 8px 6px 8px;
  border-bottom: ${(props) =>
    props.management == 'book' ? '3px #8AA8CD solid' : ''};
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
  background-color: #8aa8cd;
  border: none;
  width: 71px;
  height: 36px;
  margin-left: 10px;
`;

const PageButton = styled.button`
  font-size: 14px;
  line-height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  color: #5e5f61;
  width: 22px;
  height: 22px;
  background-color: transparent;
  border-radius: 4px;
  border: none;
  + button {
    margin-left: 4px;
  }
  ${(props) =>
    props.active &&
    css`
      background-color: #8aa8cd;
      color: #f9fafc;
    `}
`;
