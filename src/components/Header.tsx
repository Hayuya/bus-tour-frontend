import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import LaunchIcon from '@mui/icons-material/Launch';

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#fff',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            height: 90,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            py: 1,
          }}
        >
          {/* 左側：ハミングツアーロゴ */}
          <Box sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
            mb: { xs: 1, md: 0 }
          }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/humming-tour-logo.png" 
                alt="芸陽観光ハミングツアー" 
                style={{ 
                  height: 'auto',
                  width: '280px',
                  maxWidth: '100%'
                }} 
              />
            </Link>
          </Box>

          {/* 右側：公式サイトリンクと電話番号 */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: { xs: 1, sm: 3 }
          }}>
            {/* 芸陽バス公式ホームページへのリンク */}
            <Button
              component="a"
              href="https://geiyo.co.jp"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<LaunchIcon />}
              sx={{ 
                color: '#0068B7',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0, 104, 183, 0.08)'
                }
              }}
            >
              芸陽バス公式ホームページ
            </Button>

            {/* 区切り線（モバイル表示では非表示） */}
            <Divider orientation="vertical" flexItem sx={{ height: 24, display: { xs: 'none', sm: 'block' } }} />

            {/* 電話番号 */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              bgcolor: '#f5f5f5',
              px: 2,
              py: 0.5,
              borderRadius: 1
            }}>
              <PhoneIcon sx={{ mr: 1, color: '#0068B7' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                084-941-4131
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* メニューバー（任意、必要に応じて） */}
      <Box sx={{ bgcolor: '#0068B7', display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: { xs: 'center', md: 'flex-start' },
            overflowX: { xs: 'auto', md: 'visible' },
            py: 1
          }}>
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;