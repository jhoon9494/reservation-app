import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import axios from 'axios';

const RoomReviews = ({ roomID }) => {
  const [reviews, setReviews] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    async function getDefaultReview() {
      const res = await axios.get('http://localhost:5000/api/review', {
        params: { roomID: roomID, page: currPage, perPage: 5 },
      });
      console.log(res.data);
      setReviews(res.data.reviews);
      setTotalPage(res.data.totalPage);
    }
    getDefaultReview();
  }, [currPage]);

  return (
    <>
      {reviews.length > 0 ? (
        <Container>
          {reviews.map((data, idx) => {
            return (
              <ReviewContainer key={`${data.objectId} - ${idx}`}>
                <p>
                  <span>예약자명</span>
                  <br />
                  {/* FIXME data에서 유저명을 찾으면 userID값이 나옴. 아마 포스트맨으로 직접 id값을 넣어서 그런게 아닌지.. 아니면 populate가 안된건가....모르겠네ㅎ.. */}
                  김아무개
                </p>
                <p>
                  <span>평점</span>
                  <br />
                  {data.grade}점
                </p>
                <p>
                  <span>제목 : </span>
                  {data.title}
                  <br />
                  {data.content}
                </p>
              </ReviewContainer>
            );
          })}
          {/* FIXME 페이지네이션 대충 구현했음. 다른 코드 참고해서 수정하기 */}

          <ButtonContainer>
            <LeftArrow
              onClick={() =>
                setCurrPage((curr) => {
                  if (curr > 1) return curr - 1;
                  else return 1;
                })
              }
            />
            {Array(10 * parseInt(totalPage / 10) + (totalPage % 10))
              .fill()
              .map((data, idx) => {
                return (
                  <PageNationBtn
                    key={`pagination-${idx}`}
                    onClick={() => setCurrPage(idx + 1)}
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
        </Container>
      ) : (
        <NonReview>
          <h4>작성된 후기가 없어요 😭</h4>
        </NonReview>
      )}
    </>
  );
};

export default RoomReviews;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  overflow-y: auto;
`;

const ReviewContainer = styled.div`
  width: 95%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 11px;
  border-radius: 5px;
  box-shadow: 3px 3px 10px lightgray;
  margin: 0 auto 10px;
  & > p {
    flex-basis: 70px;
  }

  & > p:last-child {
    flex-basis: 350px;
  }

  & span {
    color: #00000080;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const LeftArrow = styled(VscChevronLeft)`
  transform: scale(2);
  position: absolute;
  top: 8px;
  left: 8%;
`;

const RigthArrow = styled(VscChevronRight)`
  transform: scale(2);
  position: absolute;
  top: 8px;
  right: 8%;
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

const NonReview = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
