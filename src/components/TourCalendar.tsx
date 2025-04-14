import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Button,
  Chip
} from '@mui/material';

// カレンダーの日付と価格情報の型定義
interface CalendarDate {
  date: number;
  price?: number;
  available: boolean;
}

// 月のデータ型定義
interface MonthData {
  year: number;
  month: number;
  days: CalendarDate[][];
}

// サンプルデータ - 実際の実装では、APIから取得するか、
// src/data/内の別ファイルから読み込む形になります
const getSampleCalendarData = (year: number, month: number): MonthData => {
  // 月の初日の曜日を取得 (0: 日曜日, 1: 月曜日, ...)
  const firstDay = new Date(year, month - 1, 1).getDay();
  
  // 月の最終日を取得
  const lastDate = new Date(year, month, 0).getDate();
  
  // カレンダー表示用の配列を初期化
  const days: CalendarDate[][] = [];
  let week: CalendarDate[] = Array(7).fill(null).map(() => ({ date: 0, available: false }));
  
  // 前月の日付を埋める
  for (let i = 0; i < firstDay; i++) {
    week[i] = { date: 0, available: false };
  }
  
  // 今月の日付を埋める
  let currentWeek = firstDay;
  for (let i = 1; i <= lastDate; i++) {
    // 特定の日に価格を設定 (例: 14日と25日)
    let price;
    let available = false;
    
    if (i === 14 || i === 25) {
      price = 12980;
      available = true;
    }
    
    week[currentWeek] = { date: i, price, available };
    currentWeek++;
    
    // 週が終わったら、新しい週を始める
    if (currentWeek === 7 || i === lastDate) {
      days.push([...week]);
      week = Array(7).fill(null).map(() => ({ date: 0, available: false }));
      currentWeek = 0;
    }
  }
  
  return { year, month, days };
};

// 曜日の表示名
const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

const TourCalendar: React.FC = () => {
  // 現在の年月を状態として管理
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(6); // 6月
  
  // カレンダーデータを取得
  const calendarData = getSampleCalendarData(currentYear, currentMonth);
  
  // 前月へ移動
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // 次月へ移動
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <Box>
      {/* 月選択タブ */}
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Button 
          variant="outlined" 
          size="small"
          onClick={handlePrevMonth}
          sx={{ 
            mr: 1, 
            borderColor: '#e0e0e0', 
            color: 'text.primary', 
            '&:hover': { borderColor: 'primary.main' } 
          }}
        >
          6月
        </Button>
        <Button 
          variant="outlined" 
          size="small"
          onClick={handleNextMonth}
          sx={{ 
            borderColor: '#e0e0e0', 
            color: 'text.primary', 
            '&:hover': { borderColor: 'primary.main' } 
          }}
        >
          7月
        </Button>
      </Box>
      
      {/* カレンダーヘッダー */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {currentYear}年{currentMonth}月
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip 
              label="催行" 
              size="small"
              sx={{ 
                fontSize: '0.7rem', 
                height: '24px', 
                bgcolor: '#2196f3', 
                color: 'white',
                mr: 1
              }} 
            />
            <Typography variant="body2">12,980円</Typography>
          </Box>
        </Box>
      </Box>
      
      {/* カレンダー本体 */}
      <TableContainer component={Paper} elevation={1}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {weekdays.map((day, index) => (
                <TableCell 
                  key={index} 
                  align="center"
                  sx={{ 
                    bgcolor: index === 0 ? '#fff8f8' : index === 6 ? '#f8f8ff' : '#f5f5f5',
                    fontWeight: 'bold',
                    py: 1
                  }}
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {calendarData.days.map((week, weekIndex) => (
              <TableRow key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <TableCell 
                    key={dayIndex} 
                    align="center"
                    sx={{ 
                      height: '70px',
                      bgcolor: dayIndex === 0 ? '#fff8f8' : dayIndex === 6 ? '#f8f8ff' : 'inherit',
                      color: day.date === 0 ? '#ccc' : 'inherit',
                      p: 1,
                      position: 'relative'
                    }}
                  >
                    {day.date !== 0 && (
                      <>
                        <Typography variant="body2" sx={{ position: 'absolute', top: 5, left: 8 }}>
                          {day.date}
                        </Typography>
                        {day.available && (
                          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Chip 
                              label="催行" 
                              size="small" 
                              sx={{ 
                                bgcolor: '#2196f3', 
                                color: 'white', 
                                fontSize: '0.6rem',
                                height: '20px',
                                mb: 0.5
                              }} 
                            />
                            <Typography variant="body2" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                              {day.price?.toLocaleString()}円
                            </Typography>
                            <Button 
                              variant="contained" 
                              size="small" 
                              sx={{ 
                                mt: 0.5, 
                                fontSize: '0.7rem', 
                                py: 0, 
                                px: 1,
                                bgcolor: '#ff5722',
                                '&:hover': { bgcolor: '#e64a19' }
                              }}
                            >
                              予約する
                            </Button>
                          </Box>
                        )}
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* カレンダー凡例 */}
      <Box sx={{ mt: 2, mb: 1, display: 'flex', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#2196f3' }}></Box>
          <Typography variant="body2" color="text.secondary">催行あり</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#9e9e9e' }}></Box>
          <Typography variant="body2" color="text.secondary">催行なし</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f44336' }}></Box>
          <Typography variant="body2" color="text.secondary">満席</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TourCalendar;