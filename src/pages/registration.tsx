// src/pages/registration.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import BookingForm from '../components/BookingForm';
import { samplePlans } from '../data/samplePlans';

const RegistrationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tourId = parseInt(id || '1', 10);
  
  const plan = samplePlans.find(p => p.id === tourId);

  const handleSubmit = (formData: any) => {
    console.log('フォーム送信データ:', formData);
    // TODO: 後ほどAxiosでバックエンド送信処理を実装
  };

  if (!plan) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">ツアーが見つかりませんでした</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          予約フォーム
        </Typography>
        
        <Box sx={{ mb: 4, mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            ツアー情報
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 2 }}>
            <Box sx={{ 
              width: { xs: '100%', sm: 120 }, 
              height: { xs: 120, sm: 80 },
              mr: { sm: 2 },
              mb: { xs: 2, sm: 0 },
              backgroundImage: `url(${plan.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 1
            }} />
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" fontWeight="medium" gutterBottom>
                {plan.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {plan.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  コース番号：{plan.courseNumber}
                </Typography>
                <Typography variant="body1" color="error" fontWeight="bold">
                  {plan.price.toLocaleString()}円
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <BookingForm onSubmit={handleSubmit} tourId={tourId} />
      </Paper>
    </Container>
  );
};

export default RegistrationPage;