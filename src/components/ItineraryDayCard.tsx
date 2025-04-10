import React from 'react';
import { ItineraryDay } from '../types';

interface Props {
  dayData: ItineraryDay;
}

const ItineraryDayCard: React.FC<Props> = ({ dayData }) => (
  <div className="mb-8">
    <h4 className="text-xl text-blue-600 font-bold mb-4 bg-gray-100 p-2">{dayData.day}日目</h4>
    <div className="space-y-4">
      {dayData.schedule.map((item, index) => (
        <div key={index} className="flex">
          {item.time && <div className="mr-2">{item.place ? `${item.place} (${item.time})` : item.time}</div>}
          <div>{item.description}</div>
          {item.notes && <div className="text-sm text-gray-600 ml-2">※{item.notes}</div>}
        </div>
      ))}
      <div className="border p-2 mt-4">
        <div className="flex items-center">
          <div className="w-16 font-bold">食事</div>
          <div className="flex gap-4">
            <div>【朝食】{dayData.meals.breakfast ? '○' : '×'}</div>
            <div>【昼食】{dayData.meals.lunch ? '○' : '×'}</div>
            <div>【夕食】{dayData.meals.dinner ? '○' : '×'}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ItineraryDayCard;
