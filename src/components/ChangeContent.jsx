import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChangeContent = ({ currTitle }) => {
  const [content, setContent] = useState('');
  useEffect(() => {
    if (currTitle === '객실 설명') {
      // TODO 객실 설명관련 api 요청 후 뿌려주기
      setContent('객실 설명입니다.');
    }
    if (currTitle === '후기') {
      // TODO 후기 관련 api 요청 후 뿌려주기
      setContent('후기입니다.');
    }
  }, [currTitle]);
  return <Container>{content}</Container>;
};

export default ChangeContent;

const Container = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;
