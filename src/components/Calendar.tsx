import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDay } from '../types';

interface CalendarProps {
  calendar: CalendarDay[];
  tourId: string;
  year: number;
  month: number;
}

const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

const Calendar: React.FC<CalendarProps> = ({ calendar, tourId, year, month }) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-7 gap-px bg-gray-300 border border-gray-300">
        {weekDays.map((day, index) => (
          <div key={index} className="p-2 text-center bg-gray-700 text-white">
            {day}
          </div>
        ))}

        {calendar.map((day, index) => (
          <div
            key={index}
            className={`p-2 bg-white relative min-h-16 ${
              !day.isCurrentMonth ? 'text-gray-400' : ''
            } ${day.isAvailable ? 'cursor-pointer' : ''}
            ${weekDays[index % 7] === '日' ? 'text-red-600' : ''}
            ${weekDays[index % 7] === '土' ? 'text-blue-600' : ''}`}
          >
            <div>{day.date}</div>
            {day.isAvailable && (
              <>
                <div className="text-xs absolute top-1 right-1 bg-blue-500 text-white px-1 rounded">
                  空き
                </div>
                <div className="text-xs mt-2 text-red-600 font-bold">
                  {day.price?.toLocaleString()}円
                </div>
                <Link
                  to={`/itinerary/${tourId}?date=${year}-${month + 1}-${day.date}`}
                  className="text-xs mt-1 bg-red-600 text-white px-2 py-1 rounded block text-center"
                >
                  申込む
                </Link>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
