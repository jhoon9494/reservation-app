import { ShowUserList } from '../components/ShowUserList';
import styled from 'styled-components';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export const AdminUserPage = ({
  filteredUserData,
  setDeleteUser,
  setCurrentPage,
  pageCount,
  userData,
  currentData,
  currentPage,
  dataPerPage,
}) => {
  return (
    <UserDiv>
      <UserBar>
        <UserBarSpan>이름</UserBarSpan>
        <UserBarSpan>E-Mail</UserBarSpan>
        <UserBarSpan>전화번호</UserBarSpan>
        <UserBarSpan></UserBarSpan>
      </UserBar>
      <UserLists>
        {filteredUserData.length === 0
          ? currentData(userData).map((data) => {
              return (
                <ShowUserList
                  key={data._id}
                  data={data}
                  setDeleteUser={() => setDeleteUser()}
                />
              );
            })
          : currentData(filteredUserData).map((data) => {
              return (
                <ShowUserList
                  key={data._id}
                  data={data}
                  setDeleteUser={() => setDeleteUser()}
                />
              );
            })}
      </UserLists>

      <PageWrap>
        <ArrowButton
          disabled={currentPage == 1}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage((current) => current - 1);
          }}
        >
          <FiArrowLeft style={{ marginRight: '5px' }} /> 이전
        </ArrowButton>

        {filteredUserData.length === 0
          ? pageCount(userData)
          : pageCount(filteredUserData)}

        <ArrowButton
          style={{ marginLeft: '15px' }}
          disabled={
            filteredUserData.length === 0
              ? currentPage == Math.ceil(userData.length / dataPerPage)
              : currentPage == Math.ceil(filteredUserData.length / dataPerPage)
          }
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage((current) => current + 1);
          }}
        >
          다음
          <FiArrowRight style={{ marginLeft: '5px' }} />
        </ArrowButton>
      </PageWrap>
    </UserDiv>
  );
};

const UserDiv = styled.div`
  width: 850px;
  height: 33px;
  margin: auto;
  margin-top: 50px;
`;

const UserBar = styled.div`
  border-bottom: 1px solid #595959;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding-bottom: 10px;
`;

const UserBarSpan = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  margin: auto;
`;

const UserLists = styled.div`
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
