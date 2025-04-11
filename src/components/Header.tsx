// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 80 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img src="/logo.png" alt="芸陽バス" height="40" />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;