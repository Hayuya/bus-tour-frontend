// src/components/EmailCheckComponent.tsx
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  CircularProgress,
  InputAdornment,
  Alert
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';

// 仮想的なAPI呼び出し関数の型定義
interface CheckEmailResponse {
  exists: boolean;
  userId?: string;
}

interface EmailCheckComponentProps {
  onExistingUser: (userId: string, email: string) => void;
  onNewUser: (email: string) => void;
}

const EmailCheckComponent: React.FC<EmailCheckComponentProps> = ({ 
  onExistingUser, 
  onNewUser 
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  // メールアドレスの入力ハンドラ
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  // メールの簡易バリデーション
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // メールアドレスのチェック処理
  const checkEmailExists = async (email: string): Promise<CheckEmailResponse> => {
    // 実際の実装ではAPIサーバーにリクエストを行う
    // ここでは仮想的な実装として、特定のメールアドレスのみ存在するように設定
    return new Promise((resolve) => {
      // API呼び出しの遅延をシミュレート
      setTimeout(() => {
        // テスト用：example.comドメインは既存ユーザーとして扱う
        const exists = email.endsWith('@example.com');
        resolve({
          exists,
          userId: exists ? 'user_' + Math.floor(Math.random() * 1000) : undefined
        });
      }, 800);
    });
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('メールアドレスを入力してください');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('有効なメールアドレスを入力してください');
      return;
    }
    
    setChecking(true);
    
    try {
      const response = await checkEmailExists(email);
      
      if (response.exists && response.userId) {
        // 既存ユーザーの場合
        onExistingUser(response.userId, email);
      } else {
        // 新規ユーザーの場合
        onNewUser(email);
      }
    } catch (err) {
      setError('エラーが発生しました。もう一度お試しください。');
      console.error('Email check error:', err);
    } finally {
      setChecking(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
        予約を始める
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
          メールアドレス入力
        </Typography>
      </Box>
      
      <Alert 
        severity="info" 
        sx={{ mb: 3 }}
        icon={<InfoIcon />}
      >
        <Typography variant="body2">
          メールアドレスを入力して、予約を開始してください。アカウントをお持ちの方はログイン画面へ、初めての方は会員登録画面へご案内します。
        </Typography>
      </Alert>
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          id="email"
          label="メールアドレス"
          name="email"
          autoComplete="email"
          autoFocus
          required
          value={email}
          onChange={handleEmailChange}
          error={!!error}
          helperText={error}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
          placeholder="例：info@example.com"
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={checking}
          sx={{ py: 1.5 }}
        >
          {checking ? <CircularProgress size={24} /> : '次へ進む'}
        </Button>
        
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            ※ メールアドレスをご入力いただくと、お客様アカウントの確認を行います。
            <br />
            既存のアカウントがある場合はログイン画面へ、初めてのご利用の場合は新規登録画面へご案内します。
            <br />
            <br />
            【テスト用】@example.comのメールアドレスは既存ユーザーとして扱われます。
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmailCheckComponent;