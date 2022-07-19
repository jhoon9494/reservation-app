import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import moment from 'moment';

const { RangePicker } = DatePicker;
const format = 'YYYY.MM.DD';
// 아래 배열에 예약된 날짜 상태 집어넣고 isBetween으로 확인해서 예약유무 달력에 표시
const disabledDates = [
  {
    start: '2022.07.23',
    end: '2022.07.24',
  },
  {
    start: '2022.08.15',
    end: '2022.08.19',
  },
];

const DateRangePick = ({ setDate }) => {
  const disabledDate = (current) => {
    return disabledDates.some((date) =>
      current.isBetween(
        moment(date['start'], format).startOf('day'),
        moment(date['end'], format).endOf('day')
      )
    );
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
