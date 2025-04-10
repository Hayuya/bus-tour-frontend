import React from 'react';

interface Props {
  currentMonth: number;
  onPrev: () => void;
  onNext: () => void;
}

const MonthSwitcher: React.FC<Props> = ({ currentMonth, onPrev, onNext }) => {
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    <div className="flex gap-2 mb-4">
      <button className="px-4 py-2 bg-gray-200 rounded" onClick={onPrev}>
        {monthNames[currentMonth === 0 ? 11 : currentMonth - 1]}
      </button>
      <button className="px-4 py-2 bg-gray-200 rounded" onClick={onNext}>
        {monthNames[currentMonth === 11 ? 0 : currentMonth + 1]}
      </button>
    </div>
  );
};

export default MonthSwitcher;
