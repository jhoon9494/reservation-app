import { useEffect, useState } from 'react';
import axios from 'axios';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import moment from 'moment';
const { RangePicker } = DatePicker;

const DateRangePick = ({ setDate, roomID }) => {
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    async function getReservedDates() {
      if (roomID) {
        // 둘러보기 페이지에서 객실을 선택하고 들어온 경우
        // roomID를 통해 api호출 후 해당 객실의 예약된 날짜를 받아서 예약 불가능 표시
        const res = await axios.get(
          'http://localhost:5000/api/booking/byRoom',
          {
            params: { roomID: roomID },
          }
        );
        if (res.data) {
          // 해당 객실에 예약된 날짜가 있는 경우에만 실행
          setReservedDates(res.data.map((date) => moment(date)));
        }
      }
    }
    getReservedDates();
  }, [roomID]);

  const disabledDate = (current) => {
    return reservedDates.some((date) => {
      return current.isBetween(
        moment(date).startOf('day'),
        moment(date).endOf('day')
      );
    });
  };
  const handleDate = (date, dateString) => {
    setDate({
      startDate: new Date(dateString[0]),
      endDate: new Date(dateString[1]),
    });
  };
  return (
    <>
      <RangePicker
        disabledDate={disabledDate}
        size={'large'}
        onChange={handleDate}
      />
    </>
  );
};

export default DateRangePick;
