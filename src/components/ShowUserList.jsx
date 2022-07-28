import axios from 'axios';
import styled from 'styled-components';
// 유저 리스트
export const ShowUserList = ({ data, setDeleteUser }) => {
  // 회원탈퇴 함수

  async function withDrawal(e) {
    e.preventDefault();

    if (
      window.confirm(`${data.name} 회원님의 정보를 정말로 삭제 하시겠습니까?`)
    ) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/admin/user`,
          {
            data: {
              userId: data._id,
            },
            withCredentials: true,
          }
        );
      } catch (e) {
        alert('회원 탈퇴에 실패하였습니다.');
        console.log(e);
        return;
      }
      alert(`${data.name} 회원님의 정보를 삭제 하였습니다.`);
      setDeleteUser((current) => !current);
    }
  }

  return (
    <UserList>
      <UserListSpan>{data.name}</UserListSpan>
      <UserListSpan>{data.email}</UserListSpan>
      <UserListSpan>{data.phoneNumber}</UserListSpan>
      <UserListSpan>
        <DeleteUserBtn onClick={(e) => withDrawal(e)}>회원 탈퇴</DeleteUserBtn>
      </UserListSpan>
    </UserList>
  );
};

const UserList = styled.div`
  // display: flex;
  // align-items: center;
  // padding: 10px 0 10px 65px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  border-bottom: 1px solid black;
  padding: 10px 0px;
`;

const UserListSpan = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  margin: auto;
`;
const DeleteUserBtn = styled.button`
  width: 100px;
  height: 40px;
  border: 2px solid #ff0000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
