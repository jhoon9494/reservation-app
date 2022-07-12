import { Button } from "react-bootstrap";
import styled from "styled-components";
import baseStyle from "../styles/baseStyle";

const Home = () => {
  return (
    <Container>
      <HomeButton>둘러보기</HomeButton>
      <HomeButton>예약하러가기</HomeButton>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeButton = styled(Button)`
  padding: 8px 28px;
  background-color: ${baseStyle.mainColor};

  & + & {
    margin-left: 100px;
  }
`;
