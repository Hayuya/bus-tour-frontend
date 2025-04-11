// src/pages/registration.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import { samplePlans } from '../data/samplePlans';
import BookingWorkflow from '../components/BookingWorkflow';

const RegistrationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tourId = parseInt(id || '1', 10);
  
  const plan = samplePlans.find(p => p.id === tourId);

  if (!plan) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">ツアーが見つかりませんでした</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          予約フォーム
        </Typography>
        
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 1, 
            px: 2, 
            borderRadius: '4px 4px 0 0',
            mb: 2
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            ツアー情報
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 4 }}>
          <Box sx={{ 
            width: { xs: '100%', sm: 180 }, 
            height: { xs: 180, sm: 120 },
            mr: { sm: 3 },
            mb: { xs: 2, sm: 0 },
            backgroundImage: `url(${plan.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {plan.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {plan.description}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center', 
              mt: 1,
              p: 1.5,
              bgcolor: '#f9f9f9',
              borderRadius: 1
            }}>
              <Typography variant="body2" color="text.secondary">
                コース番号：{plan.courseNumber}
              </Typography>
              <Typography variant="h6" color="error" fontWeight="bold">
                {plan.price.toLocaleString()}円
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      
      <BookingWorkflow 
        tourId={tourId} 
        tourName={plan.title} 
      />
    </Container>
  );
};

export default RegistrationPage;