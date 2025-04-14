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

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#fff',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* Logo Area */}
      <Container>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            py: { xs: 1, sm: 1.5 },
            gap: { xs: 1, sm: 0 },
          }}
        >
          {/* Logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <Link to="/">
              <img 
                src="/humming-tour-logo.png" 
                alt="芸陽観光ハミングツアー" 
                style={{ 
                  height: 'auto',
                  width: '240px',
                  maxWidth: '100%'
                }} 
              />
            </Link>
          </Box>

          {/* Contact Info */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            {/* Website Link */}
            <Button
              component="a"
              href="https://geiyo.co.jp"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<LaunchIcon />}
              sx={{ 
                color: '#0068B7',
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                fontWeight: 'bold',
                textTransform: 'none',
                px: { xs: 1, sm: 2 },
                whiteSpace: 'nowrap',
              }}
            >
              芸陽バス公式ホームページ
            </Button>

            {/* Divider - only show on sm and above */}
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                height: 24, 
                display: { xs: 'none', sm: 'block' } 
              }} 
            />

            {/* Phone */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                bgcolor: '#f5f5f5',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                width: { xs: '100%', sm: 'auto' },
                justifyContent: 'center'
              }}
            >
              <PhoneIcon sx={{ mr: 0.5, color: '#0068B7', fontSize: { xs: '1rem', sm: '1.25rem' } }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', sm: '1rem' } 
                }}
              >
                084-941-4131
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Blue Navigation Bar */}
      <Box sx={{ bgcolor: '#0068B7' }}>
        <Container>
          <Box sx={{ py: 1 }}>
            {/* Menu items would go here */}
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;