import moment from 'moment';

const ReservePrice = ({ roomData }) => {
  const stayDate = moment(roomData.endDate).diff(
    moment(roomData.startDate),
    'days'
  );
  return (
    <>
      <h2>최종 결제 금액</h2>
      <p>상품 금액 : {`${roomData.price.toLocaleString()}`}원</p>
      <p>총 숙박일 : {stayDate}박</p>
      <hr />
      <h2>총 결제 금액 : {(stayDate * roomData.price).toLocaleString()}원</h2>
    </>
  );
};

export default ReservePrice;
