// src/components/Footer.tsx
import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#1a1a2e', color: 'white', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              芸陽バス 株式会社
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              〒739-0043<br />
              広島県東広島市西条西本町21番30号
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  路線バス
                </Typography>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
                  バスのりば
                </MuiLink>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
                  ハミングツアー
                </MuiLink>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  高速バス
                </Typography>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
                  中長距離センター
                </MuiLink>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  空港バス
                </Typography>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
                  保険センター
                </MuiLink>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
                  安全への取り組み
                </MuiLink>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  貸切バス
                </Typography>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
                  旅行・楽しむ
                </MuiLink>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>
                  まずいよぉ～
                </MuiLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <img src="/geiyo-bus-logo.png" alt="GEIYO BUS" height="30" />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Copyright © GEIYO BUS Co., Ltd. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;