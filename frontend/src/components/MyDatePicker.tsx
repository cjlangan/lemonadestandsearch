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
        <div className="flex flex-col min-w-0 w-[min(12rem,100%)]">
          <label className="mb-1 text-gray-700 font-medium">{title}</label>

          <div className="p-3 bg-white rounded-2xl shadow-md min-w-0">
            <DatePicker
              onChange={setDate}
              value={date}
              closeCalendar={false}
              className="w-full min-w-0 text-[clamp(0.875rem,2vw,1rem)] font-medium"
            />
          </div>
        </div>
    );
}

export default MyDatePicker;
