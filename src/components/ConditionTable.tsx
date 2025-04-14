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
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import Tab from '../components/Tab';
import TourCalendar from '../components/TourCalendar';
import ConditionTable from '../components/ConditionTable'; // インポート追加
import { sampleTourDetails } from '../data/sampleTourDetails';
import { sampleItinerary } from '../data/sampleItinerary';
import { sampleConditions } from '../data/sampleConditions';
import { samplePlans } from '../data/samplePlans';
import { ConditionItem } from '../types'; // 型定義をインポート

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tourId = parseInt(id || '1', 10);

  const [activeTab, setActiveTab] = useState('詳細');

  const details = sampleTourDetails.find((d) => d.id === tourId);
  const itinerary = sampleItinerary.find((i) => i.id === tourId);
  const conditions = sampleConditions.find((c) => c.id === tourId);
  const plan = samplePlans.find((p) => p.id === tourId);

  // 条件タブ用のデータを整形
  const conditionItems: ConditionItem[] = conditions ? [
    {
      title: "旅行日数",
      content: "1泊2日"
    },
    {
      title: "募集人員",
      content: "最大40名様（最小催行人員20名様）"
    },
    {
      title: "食事内容",
      content: "朝食あり 昼食なし 夕食あり"
    },
    {
      title: "ハズサイズ",
      content: "中型バス（通常40名様定員のところ余裕あり）"
    },
    {
      title: "添乗員",
      content: "添乗員同行"
    },
    {
      title: "利用ホテル",
      content: "休暇村温泉または同等クラス（和室または洋室）"
    },
    {
      title: "申込金",
      content: conditions.conditions.applicationFee
    },
    {
      title: "最少催行人員",
      content: conditions.conditions.minimumParticipants
    },
    {
      title: "キャンセルポリシー",
      content: (
        <List disablePadding>
          {conditions.conditions.cancellationPolicy.map((policy, idx) => (
            <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
              <ListItemText primary={`・${policy}`} />
            </ListItem>
          ))}
        </List>
      )
    }
  ] : [];

  const renderContent = () => {
    switch (activeTab) {
      case '詳細':
        return (
          <Box sx={{ py: 2 }}>
            {/* カレンダーセクションを詳細タブ内に配置 */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                出発日・旅行代金
              </Typography>
              
              {/* カレンダー説明テキスト */}
              <Paper 
                elevation={0} 
                sx={{ p: 2, bgcolor: '#fff4e5', borderRadius: 1, mb: 3 }}
              >
                <Typography variant="body2" color="text.secondary">
                  旅行代金は大人1名を表示しています。（ ）内は子供旅行代金です。
                  <br />
                  ※表記は 大人/○○円〜、子供/○○円〜、幼児/○○円〜○○円
                  <br />
                  設定期間：2025年6月1日〜2025年6月30日
                </Typography>
              </Paper>
              
              {/* カレンダーコンポーネント */}
              <TourCalendar />
            </Box>
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
            {/* ConditionTableコンポーネントを使用 */}
            <ConditionTable conditions={conditionItems} />
            
            {/* MUIを使った代替実装（ConditionTableがうまく動作しない場合） */}
            {!ConditionTable && (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableBody>
                    {conditionItems.map((item, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ 
                            width: '25%', 
                            fontWeight: 'bold',
                            backgroundColor: '#f5f5f5',
                            borderRight: '1px solid #e0e0e0'
                          }}
                        >
                          {item.title}
                        </TableCell>
                        <TableCell>{item.content}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
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

      {/* こだわりポイント（旧「ツアーの見どころ」）- タブの上に移動 */}
      <Paper elevation={0} sx={{ p: 3, bgcolor: '#f9f9f9', mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
          こだわりポイント
        </Typography>
        <Box sx={{ px: { xs: 1, md: 5 } }}>
          {details?.highlights.map((point, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1.5, textAlign: 'center' }}>
              ・{point}
            </Typography>
          ))}
        </Box>
      </Paper>

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