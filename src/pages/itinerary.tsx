import React from 'react';
import { Box, Button, Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { sampleItinerary } from '../data/sampleItinerary';

const ItineraryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                行程表
              </Typography>

              {sampleItinerary.map((day) => (
                <Box key={day.day} sx={{ mb: 4 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {day.day}日目
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {day.schedule.map((item, idx) => (
                    <Box key={idx} sx={{ mb: 1 }}>
                      <Typography variant="body1">
                        {item.place && `${item.place} `}
                        {item.time && `(${item.time})`}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.description}
                      </Typography>
                      {item.notes && (
                        <Typography variant="body2" color="error">
                          {item.notes}
                        </Typography>
                      )}
                    </Box>
                  ))}

                  <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc' }}>
                    <Typography variant="subtitle2">食事</Typography>
                    <Typography variant="body2">
                      朝食 {day.meals.breakfast ? '○' : '×'} ／
                      昼食 {day.meals.lunch ? '○' : '×'} ／
                      夕食 {day.meals.dinner ? '○' : '×'}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Button component={Link} to={`/conditions/${id}`} variant="outlined" sx={{ mt: 2 }}>
                旅行条件へ進む
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItineraryPage;
