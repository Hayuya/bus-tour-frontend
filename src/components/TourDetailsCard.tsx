import React from 'react';
import { TourDetails } from '../types';

interface Props {
  details: TourDetails;
}

const TourDetailsCard: React.FC<Props> = ({ details }) => (
  <div className="bg-white p-6 shadow-sm rounded mb-6">
    <h2 className="text-lg font-bold mb-2">{details.title}</h2>
    <p className="mb-3">{details.stayDuration}</p>
    <hr className="mb-3" />

    <div className="flex justify-between mb-3">
      <div>
        <p>コース番号：{details.courseNumber}</p>
        <span className="inline-block border border-gray-700 px-2 py-1 text-sm">
          {details.businessTripType}
        </span>
      </div>
      <div className="text-right">
        <p className="text-sm">旅行代金 <span className="text-xs">カード利用可</span></p>
        <p className="text-2xl font-bold text-red-600">
          {details.price.toLocaleString()}円
        </p>
      </div>
    </div>
  </div>
);

export default TourDetailsCard;
