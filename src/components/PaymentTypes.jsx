import baseStyle from '../styles/baseStyle';
import styled from 'styled-components';

const PaymentTypes = () => {
  return (
    <>
      <h2>결제 수단</h2>
      <Container>
        <PaymentTypeInput type={'checkbox'} defaultChecked />
        <PaymentType>무통장 입금</PaymentType>
      </Container>
    </>
  );
};

export default PaymentTypes;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const PaymentTypeInput = styled.input`
  width: 18px;
  height: 18px;
`;

const PaymentType = styled.span`
  margin-left: 10px;
  font-size: ${baseStyle.contentFontSize};
`;
