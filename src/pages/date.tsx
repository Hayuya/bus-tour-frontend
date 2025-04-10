import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { sampleTourDetails } from '../data/sampleTourDetails';

const DatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tour = sampleTourDetails;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {tour.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {tour.stayDuration}
              </Typography>

              <Box sx={{ display: 'flex', mt: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 300, height: 200, mr: 2 }}
                  image="/test.png"
                  alt="ツアー画像"
                />

                <Box>
                  <Typography variant="h6" color="error">
                    旅行代金 {tour.price.toLocaleString()}円
                  </Typography>

                  <Table size="small" sx={{ mt: 2 }}>
                    <TableBody>
                      <TableRow>
                        <TableCell>日数</TableCell>
                        <TableCell>{tour.details.date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>募集人員</TableCell>
                        <TableCell>{tour.details.capacity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>添乗員</TableCell>
                        <TableCell>{tour.details.transportation}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>バスサイズ</TableCell>
                        <TableCell>{tour.details.busSize}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>送迎タイプ</TableCell>
                        <TableCell>{tour.details.pickupService}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>

              <Button variant="contained" color="error" sx={{ mt: 2 }}>
                出発日・旅行代金を見る
              </Button>

              <Typography variant="h6" sx={{ mt: 4 }}>
                こだわりポイント
              </Typography>
              <Box sx={{ border: '1px solid #ccc', p: 2, mt: 1 }}>
                <Typography variant="body2">・ここにおすすめポイント</Typography>
                <Typography variant="body2">・ここにおすすめポイント</Typography>
                <Typography variant="body2">・ここにおすすめポイント</Typography>
              </Box>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                出発日・旅行代金
              </Typography>

              <Calendar calendar={[]} tourId={id || '1'} year={2025} month={5} />

              <Button component={Link} to={`/itinerary/${id}`} variant="outlined" sx={{ mt: 2 }}>
                日程表へ進む
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DatePage;
