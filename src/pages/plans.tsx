// src/pages/plans.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, Pagination } from '@mui/material';
import PlanCard from '../components/PlanCard';
import { samplePlans } from '../data/samplePlans';

const PlansPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const plansPerPage = 5;
  const totalPages = Math.ceil(samplePlans.length / plansPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayedPlans = samplePlans.slice(
    (page - 1) * plansPerPage,
    page * plansPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {displayedPlans.map((plan) => (
        <PlanCard key={plan.id} {...plan} />
      ))}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          全記事 {samplePlans.length} 件中 {(page - 1) * plansPerPage + 1} - {Math.min(page * plansPerPage, samplePlans.length)} 件を表示中
        </Typography>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary" 
          size="small"
        />
      </Box>
    </Container>
  );
};

export default PlansPage;