import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';

const ChangeTitle = ({ currTitle, setCurrTitle }) => {
  const titles = ['객실 설명', '후기'];
  return (
    <Container>
      {titles.map((title, idx) => {
        return (
          <Title
            key={`${title}-${idx}`}
            active={currTitle === title}
            onClick={() => setCurrTitle(title)}
          >
            {title}
          </Title>
        );
      })}
    </Container>
  );
};

export default ChangeTitle;

const Container = styled.div`
  width: 300px;
  height: 30px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-around;
`;

const Title = styled.div`
  width: 100px;
  text-align: center;

  ${(props) =>
    props.active &&
    css`
      border-bottom: 5px solid ${baseStyle.mainColor};
    `}

  :hover {
    cursor: pointer;
  }
`;
