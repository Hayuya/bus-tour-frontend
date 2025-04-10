import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { samplePlans } from '../data/samplePlans';

const PlansPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4} justifyContent="center">
        {samplePlans.map((plan) => (
          <Grid item xs={12} md={10} key={plan.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {plan.stayDuration}
                </Typography>

                <Box sx={{ display: 'flex', mt: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 250, height: 160, mr: 2 }}
                    image="/test.png"
                    alt="ツアー画像"
                  />
                  <Box>
                    <Typography variant="body2">コース番号：{plan.courseNumber}</Typography>
                    <Typography variant="body2">{plan.businessTripType}</Typography>
                    <Typography variant="h6" color="error" sx={{ mt: 1 }}>
                      旅行代金 {plan.price.toLocaleString()}円
                    </Typography>

                    <table style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                      <tbody>
                        <tr>
                          <td>出発地：</td>
                          <td>{plan.departurePlace}</td>
                        </tr>
                        <tr>
                          <td>目的地：</td>
                          <td>{plan.destination}</td>
                        </tr>
                        <tr>
                          <td>募集人員：</td>
                          <td>{plan.capacity} {plan.minCapacity}</td>
                        </tr>
                        <tr>
                          <td>食事：</td>
                          <td>
                            朝{plan.meals.breakfast}回 昼{plan.meals.lunch}回 夕{plan.meals.dinner}回
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Box>

                <Button
                  component={Link}
                  to={`/plans/${plan.id}`}
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                >
                  予約・詳細へ
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlansPage;
