import React from 'react';

interface Props {
  title: string;
  stayDuration: string;
  courseNumber: string;
  businessTripType: string;
  price: number;
}

const TourHeaderCard: React.FC<Props> = ({
  title,
  stayDuration,
  courseNumber,
  businessTripType,
  price
}) => (
  <div className="bg-white p-6 shadow-sm rounded mb-6">
    <h2 className="text-lg font-bold mb-2">{title}</h2>
    <p className="mb-3">{stayDuration}</p>
    <hr className="mb-3" />
    <div className="flex justify-between">
      <div>
        <p>コース番号：{courseNumber}</p>
        <span className="inline-block border border-gray-700 px-2 py-1 text-sm">{businessTripType}</span>
      </div>
      <div className="text-right">
        <p className="text-sm">旅行代金</p>
        <p className="text-2xl font-bold text-red-600">{price.toLocaleString()}円</p>
      </div>
    </div>
  </div>
);

export default TourHeaderCard;
