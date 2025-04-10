import React from 'react';
import { Link } from 'react-router-dom';
import { TourPlan } from '../types';

interface Props {
  plan: TourPlan;
}

const TourPlanCard: React.FC<Props> = ({ plan }) => (
  <div className="bg-white mb-6 p-6 shadow-sm rounded">
    <h2 className="text-lg font-bold mb-2">{plan.title}</h2>
    <p className="mb-3">{plan.stayDuration}</p>
    <hr className="mb-3" />

    <div className="flex justify-between mb-3">
      <div>
        <p>コース番号：{plan.courseNumber}</p>
        <span className="inline-block border border-gray-700 px-2 py-1 text-sm">
          {plan.businessTripType}
        </span>
      </div>
      <div className="text-right">
        <p className="text-sm">旅行代金</p>
        <p className="text-2xl font-bold text-red-600">
          {plan.price.toLocaleString()}円
        </p>
      </div>
    </div>

    <div className="flex gap-6 mb-4">
      <div className="w-1/3">
        <img
          src="/api/placeholder/400/320"
          alt="旅行イメージ"
          className="w-full object-cover rounded"
        />
      </div>
      <div className="w-2/3">
        <div className="border mb-4">
          <div className="bg-gray-100 p-2 text-center">設定期間</div>
          <div className="p-2">-</div>
        </div>

        <div className="border mb-4">
          <div className="bg-gray-100 p-2 text-center">コース情報</div>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="p-2 border-r w-1/4">出発地</td>
                <td className="p-2">{plan.departurePlace}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">目的地</td>
                <td className="p-2">{plan.destination}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">募集人員</td>
                <td className="p-2">
                  {plan.capacity} {plan.minCapacity}
                </td>
              </tr>
              <tr>
                <td className="p-2 border-r">食事</td>
                <td className="p-2">
                  朝食{plan.meals.breakfast}回 昼食{plan.meals.lunch}回 夕食{plan.meals.dinner}回
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Link
      to={`/plans/${plan.id}`}
      className="block w-full bg-red-600 text-white text-center py-3 rounded hover:bg-red-700 transition"
    >
      予約・詳細へ
    </Link>
  </div>
);

export default TourPlanCard;
