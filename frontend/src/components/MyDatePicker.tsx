import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import type { Value } from '../types/SmallTypes';

type MyDatePickerProps = {
    date: Value;
    setDate: (d: Value) => void;
    title: string;
}

function MyDatePicker({ date, setDate, title }: MyDatePickerProps) {
    return (
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">{title}</label>
        <div className="p-3 bg-white rounded-2xl shadow-md w-50">
          <DatePicker
            onChange={setDate}
            value={date}
            closeCalendar={false}
            className="w-full text-lg font-medium"
          />
        </div>
      </div>
    );
}

export default MyDatePicker;
