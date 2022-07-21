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
      await axios.delete('http://localhost:5000/api/admin/user', {
        data: {
          userId: data._id,
        },
      });
      alert(`${data.name} 회원님의 정보를 삭제 하였습니다.`);
      setDeleteUser((current) => !current);
    }
  }

  return (
    <UserList key={data.ObjectId}>
      <UserListSpan>{data.name}</UserListSpan>
      <UserListSpan>{data.email}</UserListSpan>
      <UserListSpan>{data.phoneNumber}</UserListSpan>
      <DeleteUserBtn onClick={(e) => withDrawal(e)}>회원 탈퇴</DeleteUserBtn>
    </UserList>
  );
};

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
