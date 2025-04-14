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
  Chip,
  Divider
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
  <Card sx={{ mb: 3, overflow: 'visible' }}>
    {/* タイトルと説明セクション */}
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
    
    <Divider />
    
    {/* コース番号と乗務員情報 */}
    <Box sx={{ px: 2, py: 1.5, bgcolor: '#f9f9f9' }}>
      <Typography variant="body2" display="inline" sx={{ mr: 2 }}>
        コース番号：{courseNumber}
      </Typography>
      <Chip 
        label="乗務員同行" 
        size="small" 
        sx={{ 
          bgcolor: '#f0f0f0', 
          color: '#333',
          borderRadius: 1,
          height: 24
        }} 
      />
    </Box>
    
    {/* メインコンテンツ */}
    <Box sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {/* 左側: 画像（デスクトップ表示時） */}
      <Box 
        sx={{ 
          width: { xs: '100%', md: '40%' },
          mb: { xs: 2, md: 0 },
          mr: { md: 2 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          order: { xs: 1, md: 0 } // モバイルでは下、デスクトップでは左側に配置
        }}
      >
        <CardMedia
          component="img"
          sx={{ 
            width: '100%',
            height: 'auto',
            maxHeight: 220,
            objectFit: 'contain',
            borderRadius: 1
          }}
          image={image}
          alt={title}
        />
      </Box>
      
      {/* 右側: 料金情報とコース情報（デスクトップ表示時） */}
      <Box sx={{ flex: 1, order: { xs: 0, md: 1 } }}> {/* モバイルでは上、デスクトップでは右側に配置 */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
            旅行代金
          </Typography>
          <Typography variant="h5" component="div" color="error" fontWeight="bold">
            {price.toLocaleString()}円
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            設定期間
          </Typography>
          <Box sx={{ p: 1, border: '1px solid #ddd', borderRadius: 1 }}>
            {/* 設定期間の値は提供されていないため空欄 */}
          </Box>
        </Box>
        
        <Box>
          <Typography variant="body2" align="center" sx={{ bgcolor: '#f5f5f5', py: 0.5, mb: 1 }}>
            コース情報
          </Typography>
          <Table size="small" sx={{ '& td, & th': { border: 0, py: 0.5, fontSize: '0.875rem' } }}>
            <TableBody>
              <TableRow>
                <TableCell component="th" sx={{ width: '30%', px: 1 }}>出発地</TableCell>
                <TableCell sx={{ px: 1 }}>{departure}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ px: 1 }}>目的地</TableCell>
                <TableCell sx={{ px: 1 }}>{destination}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ px: 1 }}>募集人員</TableCell>
                <TableCell sx={{ px: 1 }}>{participants}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ px: 1 }}>食事</TableCell>
                <TableCell sx={{ px: 1 }}>
                  朝食{meals.breakfast}回 昼食{meals.lunch}回 夕食{meals.dinner}回
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
    
    {/* 予約ボタン */}
    <Box sx={{ px: 2, pb: 2, pt: 0 }}>
      <Button
        component={Link}
        to={`/details/${id}`}
        variant="contained"
        fullWidth
        sx={{ 
          py: 1, 
          bgcolor: '#d32f2f', 
          '&:hover': { bgcolor: '#b71c1c' } 
        }}
      >
        予約・詳細へ
      </Button>
    </Box>
  </Card>
);

export default PlanCard;