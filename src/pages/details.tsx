// src/pages/details.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Grid
} from '@mui/material';
import Tab from '../components/Tab';
import { sampleTourDetails } from '../data/sampleTourDetails';
import { sampleItinerary } from '../data/sampleItinerary';
import { sampleConditions } from '../data/sampleConditions';
import { samplePlans } from '../data/samplePlans';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tourId = parseInt(id || '1', 10);

  const [activeTab, setActiveTab] = useState('詳細');

  const details = sampleTourDetails.find((d) => d.id === tourId);
  const itinerary = sampleItinerary.find((i) => i.id === tourId);
  const conditions = sampleConditions.find((c) => c.id === tourId);
  const plan = samplePlans.find((p) => p.id === tourId);

  const renderContent = () => {
    switch (activeTab) {
      case '詳細':
        return (
          <Box sx={{ py: 2 }}>
            {details?.highlights.map((point, index) => (
              <Typography key={index} variant="body1" sx={{ mb: 1.5 }}>
                ・{point}
              </Typography>
            ))}
          </Box>
        );
      case '行程':
        return (
          <Box sx={{ py: 2 }}>
            {itinerary?.schedule.map((day, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  {day.day}
                </Typography>
                <List disablePadding>
                  {day.activities.map((activity, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemText primary={`・${activity}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        );
      case '条件':
        return (
          <Box sx={{ py: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              申し込み金: {conditions?.conditions.applicationFee}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              最少催行人員: {conditions?.conditions.minimumParticipants}
            </Typography>
            
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              キャンセルポリシー:
            </Typography>
            <List disablePadding>
              {conditions?.conditions.cancellationPolicy.map((policy, idx) => (
                <ListItem key={idx} sx={{ py: 0.5 }}>
                  <ListItemText primary={`・${policy}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        );
      default:
        return null;
    }
  };

  if (!plan || !details || !itinerary || !conditions) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">ツアーが見つかりませんでした</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Tour Summary Card */}
      <Card sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          sx={{ 
            width: { xs: '100%', md: 300 },
            height: { xs: 200, md: 'auto' },
            objectFit: 'cover',
          }}
          image={plan.image}
          alt={plan.title}
        />
        <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {plan.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {plan.description}
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                出発地: {plan.departure}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                目的地: {plan.destination}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                募集人員: {plan.participants}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                食事: 朝食{plan.meals.breakfast}回 昼食{plan.meals.lunch}回 夕食{plan.meals.dinner}回
              </Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              旅行代金
            </Typography>
            <Typography variant="h5" component="div" color="error" fontWeight="bold">
              {plan.price.toLocaleString()}円
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs and Content */}
      <Tab
        tabs={['詳細', '行程', '条件']}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <Paper elevation={0} sx={{ p: 3, bgcolor: '#f9f9f9', mt: 2, minHeight: 300 }}>
        {renderContent()}
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button 
          component={Link} 
          to="/" 
          variant="outlined"
        >
          ツアー一覧に戻る
        </Button>
        <Button 
          component={Link} 
          to={`/registration/${tourId}`} 
          variant="contained" 
          color="secondary" 
          size="large"
        >
          予約へ進む
        </Button>
      </Box>
    </Container>
  );
};

export default DetailsPage;