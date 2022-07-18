import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import moment from 'moment';
const { RangePicker } = DatePicker;

const DateRangePick = ({ setDate }) => {
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current < moment().subtract(3, 'days').endOf('day');
  };
  const handleDate = (date, dateString) => {
    setDate({ startDate: dateString[0], endDate: dateString[1] });
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
