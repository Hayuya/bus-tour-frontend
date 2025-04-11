import React from 'react';
import PlanCard from '../components/PlanCard';
import { samplePlans } from '../data/samplePlans';

const PlansPage: React.FC = () => (
  <div className="container mx-auto p-4">
    {samplePlans.map((plan) => (
      <PlanCard key={plan.id} {...plan} />
    ))}
  </div>
);

export default PlansPage;
