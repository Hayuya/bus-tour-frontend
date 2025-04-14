import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Divider, 
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RoomIcon from '@mui/icons-material/Room';
import GroupIcon from '@mui/icons-material/Group';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { samplePlans } from '../data/samplePlans';
import BookingWorkflow from '../components/BookingWorkflow';

const RegistrationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tourId = parseInt(id || '1', 10);
  
  const plan = samplePlans.find(p => p.id === tourId);

  if (!plan) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            ツアーが見つかりませんでした
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
            指定されたツアーの情報を取得できませんでした。ツアー一覧からお選びください。
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* ページタイトル */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          ツアー予約のお申し込み
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'normal' }}>
          以下のツアー情報をご確認のうえ、予約手続きにお進みください
        </Typography>
      </Box>
      
      {/* ツアー情報カード */}
      <Card 
        elevation={3} 
        sx={{ 
          mb: 5, 
          borderRadius: 2,
          overflow: 'visible'
        }}
      >
        {/* ヘッダー */}
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 2, 
            px: 3, 
            display: 'flex',
            alignItems: 'center',
            borderRadius: '8px 8px 0 0',
          }}
        >
          <InfoIcon sx={{ mr: 1.5, fontSize: '1.8rem' }} />
          <Typography variant="h5" fontWeight="bold">
            ツアー情報
          </Typography>
        </Box>
        
        {/* ツアータイトル */}
        <Box sx={{ px: 3, py: 3, bgcolor: '#f8f9fa' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {plan.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', mr: 2 }}>
              コース番号：{plan.courseNumber}
            </Typography>
            <Chip
              label="乗務員同行" 
              size="medium"
              sx={{ 
                bgcolor: '#e3f2fd', 
                color: '#0d47a1',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                height: 32,
              }}
            />
          </Box>
        </Box>
        
        <Divider />
        
        {/* メインコンテンツ */}
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            {/* 左側: 画像 */}
            <Grid item xs={12} md={5}>
              <Box 
                sx={{ 
                  position: 'relative',
                  height: '100%',
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  image={plan.image}
                  alt={plan.title}
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    height: 250,
                    objectFit: 'cover',
                  }}
                />
                
                {/* 価格表示 */}
                <Box 
                  sx={{ 
                    mt: 2,
                    p: 2, 
                    border: '2px solid #f44336',
                    borderRadius: 2,
                    bgcolor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 0.5 }}>
                    お一人様料金（税込）
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <Typography 
                      variant="h4" 
                      color="error" 
                      fontWeight="bold"
                      sx={{
                        letterSpacing: '-0.5px'
                      }}
                    >
                      {plan.price.toLocaleString()}
                    </Typography>
                    <Typography variant="h6" color="error" sx={{ ml: 0.5 }}>
                      円
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            
            {/* 右側: ツアー詳細 */}
            <Grid item xs={12} md={7}>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  mb: 3
                }}
              >
                {plan.description}
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2,
                  pt: 1,
                  borderTop: '1px solid #e0e0e0'
                }}
              >
                ツアー基本情報
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 2
                    }}
                  >
                    <CalendarTodayIcon sx={{ color: 'primary.main', mr: 1.5, mt: 0.3 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        催行期間
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        2025年6月～7月
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 2
                    }}
                  >
                    <RoomIcon sx={{ color: 'primary.main', mr: 1.5, mt: 0.3 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        出発地
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        {plan.departure}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 2
                    }}
                  >
                    <RoomIcon sx={{ color: 'primary.main', mr: 1.5, mt: 0.3 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        目的地
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        {plan.destination}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 2
                    }}
                  >
                    <GroupIcon sx={{ color: 'primary.main', mr: 1.5, mt: 0.3 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        募集人員
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        {plan.participants}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 2
                    }}
                  >
                    <RestaurantIcon sx={{ color: 'primary.main', mr: 1.5, mt: 0.3 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        お食事
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        朝食 {plan.meals.breakfast}回、昼食 {plan.meals.lunch}回、夕食 {plan.meals.dinner}回
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
      
      {/* 予約フォーム */}
      <Box sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 2, 
            px: 3, 
            display: 'flex',
            alignItems: 'center',
            borderRadius: '8px 8px 0 0',
            mb: 0
          }}
        >
          <PaymentIcon sx={{ mr: 1.5, fontSize: '1.8rem' }} />
          <Typography variant="h5" fontWeight="bold">
            ご予約手続き
          </Typography>
        </Box>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            pt: 4,
            borderRadius: '0 0 8px 8px',
            borderTop: 'none'
          }}
        >
          <BookingWorkflow 
            tourId={tourId} 
            tourName={plan.title} 
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default RegistrationPage;