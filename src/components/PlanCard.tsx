import React from 'react';
import { Link } from 'react-router-dom';

interface PlanCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  departure: string;
  destination: string;
  participants: string;
  meals: { breakfast: number; lunch: number; dinner: number };
  image: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  id,
  title,
  description,
  price,
  departure,
  destination,
  participants,
  meals,
  image,
}) => (
  <div className="border shadow-md rounded-xl p-4 mb-4 flex flex-col md:flex-row">
    <img src={image} alt={title} className="w-full md:w-1/3 h-auto object-cover rounded-lg mr-4" />
    <div className="flex-1">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <table className="table-auto w-full text-sm text-left mb-4">
        <tbody>
          <tr>
            <th className="py-1 pr-2">出発地</th>
            <td>{departure}</td>
          </tr>
          <tr>
            <th className="py-1 pr-2">目的地</th>
            <td>{destination}</td>
          </tr>
          <tr>
            <th className="py-1 pr-2">募集人員</th>
            <td>{participants}</td>
          </tr>
          <tr>
            <th className="py-1 pr-2">食事</th>
            <td>朝食:{meals.breakfast} 昼食:{meals.lunch} 夕食:{meals.dinner}</td>
          </tr>
        </tbody>
      </table>
      <div className="text-right">
        <span className="text-2xl text-red-600 font-bold mr-4">{price.toLocaleString()}円</span>
        <Link
          to={`/details/${id}`}
          className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          予約・詳細へ
        </Link>
      </div>
    </div>
  </div>
);

export default PlanCard;
