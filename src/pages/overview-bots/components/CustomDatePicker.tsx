import 'react-date-picker/dist/DatePicker.css';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { CalendarIcon } from '@assets/icons';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomDatePicker = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <DatePicker
      format="y-MM-dd"
      dayPlaceholder="DD"
      monthPlaceholder="MM"
      yearPlaceholder="YYYY"
      clearIcon={null}
      calendarIcon={<CalendarIcon fontSize={24} />}
      className="bg-light-200 text-dark-blue text-sm w-full h-[2.25rem] rounded-[100px] px-5"
      onChange={onChange}
      value={value}
    />
  );
};

export default CustomDatePicker;
