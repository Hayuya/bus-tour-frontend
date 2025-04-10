import React from 'react';
import { Box, Button, Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { sampleConditions } from '../data/sampleConditions';

const ConditionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                重要事項
              </Typography>
              <Box sx={{ border: '1px solid', borderColor: 'error.light', bgcolor: 'error.light', p: 2, mb: 3 }}>
                {sampleConditions[0].content}
              </Box>

              <Typography variant="h5" gutterBottom>
                旅行条件
              </Typography>
              <Table>
                <TableBody>
                  {sampleConditions.slice(1).map((condition, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" sx={{ width: '25%', fontWeight: 'bold' }}>
                        {condition.title}
                      </TableCell>
                      <TableCell>{condition.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Typography variant="body2" sx={{ mt: 2 }}>
                その他の条件は当社旅行業約款によります。不明な点はお問い合わせください。
              </Typography>

              <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
                トップへ戻る
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConditionsPage;
