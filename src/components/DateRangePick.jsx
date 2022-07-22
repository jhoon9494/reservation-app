import { useEffect, useState } from 'react';
import axios from 'axios';
import { DatePicker } from 'antd';
import 'antd/dist/antd.min.css';
import moment from 'moment';
const { RangePicker } = DatePicker;

const DateRangePick = ({ setDate, roomID }) => {
  const [reservedDates, setReservedDates] = useState([]);
  const [dateRange, changeDateRange] = useState(null);

  useEffect(() => {
    // 예약 불가능한 날짜 데이터를 받기 전 배열 초기화
    setReservedDates([]);
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
  const handleDate = (date) => {
    const startDate = moment(date[0], 'YYYY-MM-DD');
    const endDate = moment(date[1], 'YYYY-MM-DD');

    changeDateRange([
      moment(date[0], 'YYYY-MM-DD'),
      moment(date[1], 'YYYY-MM-DD'),
    ]);

    // 선택한 일정 사이에 예약 불가능한 날짜가 있는 경우 경고창으로 알려줌
    if (
      reservedDates.some((date) => {
        return moment(date).isBetween(startDate, endDate, 'day', []);
      })
    ) {
      changeDateRange([]);
      return alert('일정을 다시 확인해주세요.');
    }

    setDate({
      startDate: startDate._d,
      endDate: endDate._d,
    });
  };
  return (
    <>
      <RangePicker
        disabledDate={disabledDate}
        size={'large'}
        onChange={handleDate}
        value={dateRange}
      />
    </>
  );
};

export default DateRangePick;
