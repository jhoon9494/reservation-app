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
    async function getReservedDates() {
      if (roomID) {
        try {
          // 둘러보기 페이지에서 객실을 선택하고 들어온 경우
          // roomID를 통해 api호출 후 해당 객실의 예약된 날짜를 받아서 예약 불가능 표시
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/booking/byRoom`,
            {
              params: { roomID: roomID },
            }
          );
          if (res.data) {
            // 해당 객실에 예약된 날짜가 있는 경우
            setReservedDates(res.data.map((date) => moment(date)));
          } else {
            // 해당 객실에 예약된 날짜가 없는 경우
            setReservedDates([]);
          }
        } catch (e) {
          console.error('선택하신 객실을 다시 확인해주세요');
        }
      } else {
        // 예약페이지로 직접 접근했을 경우 예약된 날짜 배열을 초기화
        // 해당 코드가 없을 경우 둘러보기 페이지에서 예약된 날짜를 확인하다가,
        // navbar의 예약페이지로 바로 접근했을 때 예약 불가능한 날짜가 초기화되지 않는 현상이 발생함.
        setReservedDates([]);
      }
    }
    getReservedDates();
  }, [roomID]);

  const disabledDate = (current) => {
    if (
      reservedDates.some((date) => {
        return current.isBetween(
          moment(date).startOf('day'),
          moment(date).endOf('day')
        );
      }) ||
      current < moment().startOf('day')
    )
      return true;
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
