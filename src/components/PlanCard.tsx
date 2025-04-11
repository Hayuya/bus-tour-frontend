// src/components/PlanCard.tsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableRow, 
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';

interface PlanCardProps {
  id: number;
  title: string;
  description: string;
  courseNumber: string;
  price: number;
  departure: string;
  destination: string;
  participants: string;
  meals: { breakfast: number; lunch: number; dinner: number };
  image: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  id,
  title,
  description,
  courseNumber,
  price,
  departure,
  destination,
  participants,
  meals,
  image,
}) => (
  <Card sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          コース番号：{courseNumber}
        </Typography>
        <Chip 
          label="乗務員同行" 
          size="small" 
          sx={{ 
            mt: 1, 
            bgcolor: '#f0f0f0', 
            color: '#333',
            borderRadius: 1,
            height: 24
          }} 
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          sx={{ 
            width: { xs: '100%', md: 250 },
            height: { xs: 200, md: 'auto' },
            objectFit: 'cover',
            p: { xs: 2, md: 2 },
            pb: { xs: 0, md: 2 },
          }}
          image={image}
          alt={title}
        />
        
        <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" component="div" gutterBottom sx={{ textAlign: 'right', color: 'text.secondary' }}>
                旅行代金
              </Typography>
              <Typography variant="h5" component="div" color="error" fontWeight="bold" gutterBottom sx={{ textAlign: 'right' }}>
                {price.toLocaleString()}円
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  設定期間
                </Typography>
                <Box sx={{ p: 1, border: '1px solid #ddd', borderRadius: 1, mb: 2 }}>
                  {/* 設定期間の値は提供されていないため空欄 */}
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ textAlign: 'center', mb: 1, bgcolor: '#f5f5f5', py: 0.5 }}>
                コース情報
              </Typography>
              
              <Table size="small" sx={{ '& td, & th': { border: 0, py: 0.5 } }}>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" sx={{ width: '30%' }}>出発地</TableCell>
                    <TableCell>{departure}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">目的地</TableCell>
                    <TableCell>{destination}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">募集人員</TableCell>
                    <TableCell>{participants}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">食事</TableCell>
                    <TableCell>
                      朝食{meals.breakfast}回 昼食{meals.lunch}回 夕食{meals.dinner}回
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                component={Link}
                to={`/details/${id}`}
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ py: 1 }}
              >
                予約・詳細へ
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Box>
  </Card>
);

export default PlanCard;
