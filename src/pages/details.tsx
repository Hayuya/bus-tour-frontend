import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Tab from '../components/Tab';
import { sampleTourDetails } from '../data/sampleTourDetails';
import { sampleItinerary } from '../data/sampleItinerary';
import { sampleConditions } from '../data/sampleConditions';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tourId = parseInt(id, 10);

  const [activeTab, setActiveTab] = useState('詳細');

  const details = sampleTourDetails.find((d) => d.id === tourId);
  const itinerary = sampleItinerary.find((i) => i.id === tourId);
  const conditions = sampleConditions.find((c) => c.id === tourId);

  const renderContent = () => {
    switch (activeTab) {
      case '詳細':
        return details?.highlights.map((point, index) => (
          <p key={index} className="mb-2">・{point}</p>
        ));
      case '行程':
        return itinerary?.schedule.map((day, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{day.day}</h3>
            {day.activities.map((activity, idx) => (
              <p key={idx}>・{activity}</p>
            ))}
          </div>
        ));
      case '条件':
        return (
          <div>
            <p>申し込み金: {conditions?.conditions.applicationFee}</p>
            <p>最少催行人員: {conditions?.conditions.minimumParticipants}</p>
            <p className="mt-2 font-semibold">キャンセルポリシー:</p>
            {conditions?.conditions.cancellationPolicy.map((policy, idx) => (
              <p key={idx}>・{policy}</p>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Tab
        tabs={['詳細', '行程', '条件']}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <div className="mt-4 p-4 border rounded bg-gray-50">
        {renderContent()}
      </div>
      <div className="text-right mt-4">
        <Link
          to={`/registration/${tourId}`}
          className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          予約へ進む
        </Link>
      </div>
    </div>
  );
};

export default DetailsPage;
