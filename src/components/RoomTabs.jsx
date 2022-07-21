import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';

const RoomDetailTabs = ({ currTab, setCurrTab }) => {
  const tabs = ['객실 설명', '후기'];
  return (
    <Container>
      {tabs.map((tab, idx) => {
        return (
          <Title
            key={`${tab}-${idx}`}
            active={currTab === tab}
            onClick={() => setCurrTab(tab)}
          >
            {tab}
          </Title>
        );
      })}
    </Container>
  );
};

export default RoomDetailTabs;

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
