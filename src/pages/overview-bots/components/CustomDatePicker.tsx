import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import { CalendarIcon } from '@assets/icons';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ICustomDatePickerProps {
  getUnixTimeStamp: (unixTimeStamp: number) => void;
}

const CustomDatePicker: React.FC<ICustomDatePickerProps> = ({
  getUnixTimeStamp,
}) => {
  const [value, setValue] = useState<Value>(new Date());

  const handleDateChange = (date: Value) => {
    setValue(date);

    if (date && !Array.isArray(date)) {
      const unixTimestamp = Math.floor(date.getTime() / 1000);
      console.log('Unix Timestamp (Single Date):', unixTimestamp);
      getUnixTimeStamp(unixTimestamp);
    } else if (Array.isArray(date)) {
      const startTimestamp = date[0]
        ? Math.floor(date[0].getTime() / 1000)
        : null;
      const endTimestamp = date[1]
        ? Math.floor(date[1].getTime() / 1000)
        : null;
      console.log('Unix Timestamp (Date Range):', {
        startTimestamp,
        endTimestamp,
      });
    }
  };

  return (
    <DatePicker
      format="y-MM-dd"
      dayPlaceholder="DD"
      monthPlaceholder="MM"
      yearPlaceholder="YYYY"
      clearIcon={null}
      calendarIcon={<CalendarIcon fontSize={24} />}
      className="bg-light-200 text-dark-blue text-sm w-full h-[2.25rem] rounded-[100px] px-5"
      onChange={handleDateChange}
      value={value}
    />
  );
};

export default CustomDatePicker;
