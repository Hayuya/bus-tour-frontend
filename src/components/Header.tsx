// src/components/Header.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        // 画像のような濃いめのブルー系の背景色
        backgroundColor: '#0068B7',
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            height: 80,
            display: 'flex',
            alignItems: 'center',
            // 必要に応じて justifyContent や padding を追加
          }}
        >
          {/* 左側：ロゴやサイト名 */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo.png" alt="芸陽バス" height="40" />
            </Link>

            {/* メニューを横に並べたい場合のサンプル */}
            <Box sx={{ ml: 5 }}>
              <Button
                component={Link}
                to="/timetable"
                sx={{ color: '#fff', mr: 2 }}
              >
                時刻表検索
              </Button>
              <Button
                component={Link}
                to="/fare"
                sx={{ color: '#fff', mr: 2 }}
              >
                運賃検索
              </Button>
              <Button component={Link} to="/contact" sx={{ color: '#fff' }}>
                お問い合わせ
              </Button>
            </Box>
          </Box>

          {/* 右側：電話番号、問い合わせアイコンなど */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* 電話アイコンと電話番号 */}
            <PhoneIcon sx={{ mr: 1 }} />
            <Typography variant="body1" sx={{ mr: 2 }}>
              084-941-4131
            </Typography>

            {/* お問い合わせへのリンク（アイコンボタン） */}
            <IconButton component={Link} to="/contact" sx={{ color: '#fff' }}>
              <MailOutlineIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
