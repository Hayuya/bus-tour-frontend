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
import { sampleTourDetails } from '../data/sampleTourDetails';
import { sampleItinerary } from '../data/sampleItinerary';
import { sampleConditions } from '../data/sampleConditions';
import { samplePlans } from '../data/samplePlans';

// 条件テーブル用コンポーネント（シンプル化のため直接定義）
interface ConditionRowProps {
  title: string;
  content: React.ReactNode;
}

const ConditionRow: React.FC<ConditionRowProps> = ({ title, content }) => (
  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td': { borderColor: '#e0e0e0' } }}>
    <TableCell 
      component="th" 
      scope="row"
      sx={{ 
        width: '25%', 
        bgcolor: '#f5f5f5', 
        fontWeight: 'bold',
        verticalAlign: 'top',
        py: 2,
        px: 3
      }}
    >
      {title}
    </TableCell>
    <TableCell sx={{ py: 2, px: 3 }}>
      {content}
    </TableCell>
  </TableRow>
);

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tourId = parseInt(id || '1', 10);

  const [activeTab, setActiveTab] = useState('詳細');

  const details = sampleTourDetails.find((d) => d.id === tourId);
  const itinerary = sampleItinerary.find((i) => i.id === tourId);
  const conditions = sampleConditions.find((c) => c.id === tourId);
  const plan = samplePlans.find((p) => p.id === tourId);

  // 含まれるものリスト
  const includedItems = [
    "日程に基づく往復交通費",
    "宿泊費",
    "食事代（マークのあるもの）",
    "入場料",
    "消費税"
  ];

  // 行程表用の詳細データ（実際のプロジェクトではAPIから取得する想定）
  const scheduleData = [
    {
      day: "1日目",
      details: [
        { time: "芸陽バス本社", note: "(9:00発)" },
        { time: "西条駅南口", note: "(9:05発)" },
        { time: "≪山陽・瀬戸中央道≫", note: "" },
        { time: "瀬戸大橋を間近に与島PA", note: "" },
        { time: "国指定有形文化財のお屋敷でうどん料理・鯛屋敷", note: "" },
        { time: "屋島ドライブウェイ・上り？下り？ミステリー坂(車窓)", note: "" },
        { time: "84番札所・屋島寺・ガラス張りの曲線回廊「やしま～る」", note: "" },
        { time: "香川の老舗ローカル私鉄「ことでん」志度線にご乗車(琴電屋島駅⇒瓦町)", note: "" },
        { time: "3/27リニューアルオープンのホテルへ早めにチェックイン(16:00頃着)", note: "" },
        { time: "※「水晶テラス」「瀬戸内夫妻の絶景風呂」などリニューアル施設でゆっくりご滞在ください。", note: "" }
      ],
      meals: {
        breakfast: { included: false, mark: "×" },
        lunch: { included: true, mark: "○" },
        dinner: { included: true, mark: "○" }
      }
    },
    {
      day: "2日目",
      details: [
        { time: "ホテル(9:00発)", note: "" },
        { time: "特別名勝・栗林公園内でハート型に花をつける恋つづじ鑑賞", note: "" },
        { time: "日本のウユニ塩湖と呼ばれSNSで話題の父母ヶ浜(散策)", note: "" },
        { time: "日本の夕陽百選・有明浜に行む「琴弾回廊」で和食膳のランチ", note: "" },
        { time: "石垣の名城・丸亀城(入場)", note: "" },
        { time: "≪瀬戸中央・山陽道≫", note: "" },
        { time: "西条駅南口", note: "(17:25着)" },
        { time: "芸陽バス本社", note: "(17:30着)" }
      ],
      meals: {
        breakfast: { included: true, mark: "○" },
        lunch: { included: true, mark: "○" },
        dinner: { included: false, mark: "×" }
      }
    }
  ];

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
                sx={{ p: 2, bgcolor: '#fff4e5', borderRadius: 1, mb: 3, border: '1px solid #ffe0b2' }}
              >
                <Typography variant="body2">
                  旅行代金は 大人1名を表示しています。（ ）内料金は子供旅行代金です。
                  <br />
                  年齢区分　大人/〇〇歳～、子供/〇〇歳～、幼児/〇〇歳～〇〇歳
                  <br />
                  設定期間　2025年〇月〇〇日～2025年〇月〇〇日
                </Typography>
              </Paper>
              
              {/* カレンダーコンポーネント */}
              <TourCalendar />
            </Box>
          </Box>
        );
      case '行程表':
        return (
          <Box sx={{ py: 2 }}>
            {/* 行程表タイトル */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" component="h2" fontWeight="bold">
                行程表
              </Typography>
              <Box sx={{ width: '60px', height: '2px', bgcolor: '#3f51b5', mx: 'auto', mt: 1 }} />
            </Box>

            {/* 行程表の内容 */}
            {scheduleData.map((daySchedule, dayIndex) => (
              <Box key={dayIndex} sx={{ mb: 4 }}>
                {/* 日付ヘッダー */}
                <Box 
                  sx={{ 
                    bgcolor: '#f0f0f0', 
                    py: 1.5, 
                    px: 3, 
                    mb: 2,
                    borderRadius: '4px'
                  }}
                >
                  <Typography variant="h6" component="h3" sx={{ color: '#4299e1', fontWeight: 'bold' }}>
                    {daySchedule.day}
                  </Typography>
                </Box>

                {/* 行程詳細リスト */}
                <Box sx={{ px: 1 }}>
                  {daySchedule.details.map((detail, detailIndex) => (
                    <Box 
                      key={detailIndex} 
                      sx={{ 
                        mb: detailIndex === daySchedule.details.length - 1 && detail.time.startsWith("※") ? 0 : 1.5,
                        pl: detail.time.startsWith("※") ? 0 : 0
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontSize: detail.time.startsWith("※") ? '0.85rem' : '1rem',
                          color: detail.time.startsWith("※") ? 'text.secondary' : 'text.primary',
                          lineHeight: 1.5
                        }}
                      >
                        {detail.time} {detail.note}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* 食事情報 */}
                <Box 
                  sx={{ 
                    mt: 3, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '4px',
                    display: 'flex'
                  }}
                >
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      width: '80px', 
                      bgcolor: '#e3f2fd', 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: '1px solid #e0e0e0'
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                      食事
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      flex: 1, 
                      display: 'flex', 
                      alignItems: 'center',
                      px: 2
                    }}
                  >
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      [朝食] {daySchedule.meals.breakfast.mark}
                    </Typography>
                    <Typography variant="body2" sx={{ mx: 2 }}>
                      [昼食] {daySchedule.meals.lunch.mark}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      [夕食] {daySchedule.meals.dinner.mark}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        );
      case '条件':
        return (
          <Box sx={{ py: 2 }}>
            {/* 見出し - 重要事項 */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" component="h2" fontWeight="bold">
                重要事項
              </Typography>
              <Box sx={{ width: '60px', height: '2px', bgcolor: '#3f51b5', mx: 'auto', mt: 1 }} />
            </Box>

            {/* 重要事項コンテナ */}
            <Box 
              sx={{ 
                border: '1px solid #f44336', 
                borderRadius: 1, 
                p: 2, 
                mb: 4
              }}
            >
              <Typography variant="body2">
                旅行代金は 大人1名を表示しています。（ ）内料金は子供旅行代金です。
                <br />
                年齢区分　大人/〇〇歳～、子供/〇〇歳～、幼児/〇〇歳～〇〇歳
                <br />
                設定期間　2025年〇月〇〇日～2025年〇月〇〇日
              </Typography>
            </Box>

            {/* 見出し - 旅行条件 */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" component="h2" fontWeight="bold">
                旅行条件
              </Typography>
              <Box sx={{ width: '60px', height: '2px', bgcolor: '#3f51b5', mx: 'auto', mt: 1 }} />
            </Box>

            {/* 旅行条件テーブル */}
            <TableContainer component={Paper} elevation={1} sx={{ mb: 4 }}>
              <Table>
                <TableBody>
                  <ConditionRow 
                    title="申し込み金" 
                    content={
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>・日帰りツアー：旅行代金の金額</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>・1泊以上の国内旅行：10,000円</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>・海外旅行：主催する旅行会社の定める金額</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', mt: 1 }}>
                          ※別途申し込み金を明記したツアーを除きます
                        </Typography>
                      </Box>
                    } 
                  />
                  <ConditionRow 
                    title="旅費に含まれるもの" 
                    content={
                      <Box>
                        {includedItems.map((item, index) => (
                          <Typography key={index} variant="body2" sx={{ mb: index < includedItems.length - 1 ? 1 : 0 }}>
                            ・{item}
                          </Typography>
                        ))}
                      </Box>
                    } 
                  />
                  <ConditionRow 
                    title="少人の旅行代金" 
                    content={
                      <Typography variant="body2">
                        小人（満3才～満12才）の旅行代金は、通常旅行代金の80％とします。
                        ただし、別に小人代金を明記したツアーを除きます。
                        また、満3才未満であっても座席や食事等のご希望がある際は、別途実費を請
                        求させていただきます。
                      </Typography>
                    } 
                  />
                  <ConditionRow 
                    title="最小最高人数" 
                    content={
                      <Typography variant="body2">
                        最少催行人員は、別に明記されているツアーを除いて35名です。これに満た
                        ないときは旅行を中止することがあります。その際は出発日の7日前にお知ら
                        せいたします。
                      </Typography>
                    } 
                  />
                  <ConditionRow 
                    title="ツアーの中止
旅程の変更など" 
                    content={
                      <Typography variant="body2">
                        交通事情や気象条件等、当社の管理できない事由で旅行の実施が困難な場合
                        は、その旅行を取りやめるか、日程、内容を変更する場合があります。
                      </Typography>
                    } 
                  />
                  <ConditionRow 
                    title="帰着の遅延について" 
                    content={
                      <Typography variant="body2">
                        天候、交通事情等により帰着時間が遅れることがあります。ご了承ください。
                      </Typography>
                    } 
                  />
                  <ConditionRow 
                    title="キャンセル料" 
                    content={
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>お客様のご都合で旅行を取り消される場合は、以下の取り消し料をいただきます。</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>・出発日の20日前～8日前（日帰りの場合10日～8日前）：旅行代金の20%</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>・出発日の7日前～2日前：旅行代金の30%</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>・出発日前日：旅行代金の40%</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>・出発日当日：旅行代金の50%</Typography>
                        <Typography variant="body2">・旅行開始後：旅行代金の100%</Typography>
                      </Box>
                    } 
                  />
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              その他の条件は当社旅行業約款によります。不明な点はお問い合わせください。
            </Typography>
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
      <Card sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'visible' }}>
        <CardMedia
          component="img"
          sx={{ 
            width: { xs: '100%', md: 400 },
            height: { xs: 300, md: 300 },
            objectFit: 'contain',
            bgcolor: '#f5f5f5',
            maxHeight: { md: 300 }
          }}
          image={plan.image}
          alt={plan.title}
        />
        <CardContent sx={{ 
          flex: '1 1 auto', 
          p: 3,
          overflow: 'visible',
          width: { md: 'calc(100% - 400px)' }
        }}>
          <Typography variant="h6" component="h1" gutterBottom sx={{ wordBreak: 'break-word' }}>
            {plan.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {plan.description}
          </Typography>
          
          <Grid container spacing={1} sx={{ mt: 1 }}>
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
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              旅行代金
            </Typography>
            <Typography variant="h5" component="div" color="error" fontWeight="bold">
              {plan.price.toLocaleString()}円
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* こだわりポイント */}
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
        tabs={['詳細', '行程表', '条件']}
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