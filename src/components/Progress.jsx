import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

const Progress = () => {
  return (
    <>
      <ProgressBackground />
      <ProgressContainer>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">메일 발송중...</span>
        </Spinner>
      </ProgressContainer>
    </>
  );
};

export default Progress;

const ProgressBackground = styled.div`
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99996;
`;

const ProgressContainer = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  z-index: 99997;
`;
