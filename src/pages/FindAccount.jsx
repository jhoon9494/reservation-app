import { useState } from 'react';
import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';
import FindPassword from '../components/FindPassword';
import FindEmail from '../components/FindEmail';

const FindAccount = () => {
  const tabs = ['이메일 찾기', '비밀번호 찾기'];
  const [currentTab, setCurrentTab] = useState('이메일 찾기');
  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <TabsWrap>
        {tabs.map((tab, i) => {
          return (
            <Tab
              key={`tab-${i}`}
              active={currentTab === tab}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </Tab>
          );
        })}
      </TabsWrap>
      {currentTab === '이메일 찾기' ? <FindEmail /> : <FindPassword />}
    </>
  );
};

export default FindAccount;

const TabsWrap = styled.div`
  width: 80%;
  height: 50px;
  border-bottom: 1px solid black;
  display: flex;
`;

const Tab = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${baseStyle.titleFontSize};
  font-weight: bold;
  margin-bottom: 0.25rem;
  box-sizing: content-box;

  ${(props) =>
    props.active &&
    css`
      color: ${baseStyle.mainColor};
      font-weight: bold;
      background: rgba(230, 230, 230, 0.0001);
      border-bottom: 5px solid #524fa1;
    `}

  &:hover {
    cursor: pointer;
  }

  & + & {
    border-left: 1px solid black;
  }
`;
