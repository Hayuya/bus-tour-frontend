import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, Divider } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#0a1929', color: 'white', pt: 4, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container>
          {/* 左側コンテンツ */}
          <Grid item xs={12} md={3} sx={{ pr: { md: 4 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              芸陽バス株式会社
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              〒739-0043
            </Typography>
            <Typography variant="body2">
              広島県東広島市西条西本町21番39号
            </Typography>
          </Grid>

          {/* 縦線区切り */}
          <Grid item xs={0} md={0.2} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Divider orientation="vertical" sx={{ borderColor: '#2a3b4c', height: '100%' }} />
          </Grid>

          {/* 右側メニュー */}
          <Grid item xs={12} md={8.8}>
            <Grid container spacing={1}>
              {/* 1列目 */}
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" sx={{ mb: 1.5, color: '#ccc' }}>
                  路線バス
                </Typography>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                  ハミングツアー
                </MuiLink>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                  会社案内
                </MuiLink>
              </Grid>

              {/* 2列目 */}
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" sx={{ mb: 1.5, color: '#ccc' }}>
                  高速バス
                </Typography>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                  不動産センター
                </MuiLink>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                  バス運転手募集
                </MuiLink>
              </Grid>

              {/* 3列目 */}
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" sx={{ mb: 1.5, color: '#ccc' }}>
                  空港バス
                </Typography>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                  保険センター
                </MuiLink>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                  安全への取り組み
                </MuiLink>
              </Grid>

              {/* 4列目 */}
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" sx={{ mb: 1.5, color: '#ccc' }}>
                  貸切バス
                </Typography>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                  知る・楽しむ
                </MuiLink>
                <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                  各種お問い合わせ
                </MuiLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* ロゴと著作権表示 */}
        <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
          {/* ロゴ */}
          <Box sx={{ mb: 2 }}>
            <Box 
              component="img" 
              src="/images/geiyo-bus-logo.png" 
              alt="GEIYO BUS" 
              sx={{ 
                height: 'auto', 
                width: '220px',
                filter: 'brightness(0) invert(1)' // 白色表示のためのフィルター
              }}
            />
          </Box>
          
          {/* 著作権表示 */}
          <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.75rem' }}>
            Copyright © GEIYO BUS Co., Ltd. All rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;