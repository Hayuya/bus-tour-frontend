// src/components/LoginComponent.tsx
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  CircularProgress,
  Link,
  Divider,
  Alert,
  InputAdornment
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface LoginComponentProps {
  email: string;
  onLoginSuccess: (userData: any) => void;
  onBackToEmailCheck: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ 
  email, 
  onLoginSuccess, 
  onBackToEmailCheck 
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // パスワード入力ハンドラ
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  // ログイン処理（擬似的な実装）
  const loginUser = async (email: string, password: string): Promise<any> => {
    // 実際の実装ではAPIサーバーに認証リクエストを行う
    return new Promise((resolve, reject) => {
      // API呼び出しの遅延をシミュレート
      setTimeout(() => {
        // デモ用：パスワードが "password" の場合のみログイン成功
        if (password === 'password') {
          resolve({
            userId: 'user_' + Math.floor(Math.random() * 1000),
            name: '鈴木 一郎',
            nameKana: 'スズキ イチロウ',
            phone: '090-1234-5678',
            birthdate: new Date(1985, 4, 15),
            email: email
          });
        } else {
          reject(new Error('パスワードが正しくありません'));
        }
      }, 800);
    });
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError('パスワードを入力してください');
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = await loginUser(email, password);
      onLoginSuccess(userData);
    } catch (err) {
      setError('ログインに失敗しました。パスワードをご確認ください。');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
        ログイン
      </Typography>
      
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 1, 
          px: 2, 
          borderRadius: '4px 4px 0 0',
          mb: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <InfoIcon sx={{ mr: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          アカウント情報
        </Typography>
      </Box>
      
      <Alert 
        severity="info" 
        sx={{ mb: 3 }}
        icon={<InfoIcon />}
      >
        <Typography variant="body2">
          <strong>{email}</strong> でアカウントが見つかりました。パスワードを入力してログインしてください。
        </Typography>
      </Alert>
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={handlePasswordChange}
          error={!!error}
          helperText={error}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} /> : 'ログイン'}
        </Button>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBackToEmailCheck}
            variant="text"
            sx={{ mt: 1 }}
          >
            別のメールアドレスを使用する
          </Button>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', textAlign: 'center' }}>
            ※ デモ用パスワード: <strong>"password"</strong>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginComponent;