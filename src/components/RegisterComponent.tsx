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
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';

interface RegisterComponentProps {
  email: string;
  onRegisterSuccess: (userId: string) => void;
  onBackToEmailCheck: () => void;
}

interface RegistrationData {
  // 代表者情報
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nameKana: string;
  phone: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  birthdate: Date | null;

  // 緊急連絡先
  emergencyName: string;
  emergencyNameKana: string;
  emergencyPhone: string;
  emergencyRelation: string;
}

// 都道府県リスト
const prefectures = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

// 続柄リスト
const relations = [
  '配偶者', '父', '母', '子', '祖父', '祖母', '兄弟', '姉妹', 
  '義父', '義母', '義兄弟', '義姉妹', '親戚', '友人', 'その他'
];

const RegisterComponent: React.FC<RegisterComponentProps> = ({
  email,
  onRegisterSuccess,
  onBackToEmailCheck
}) => {
  // ステップ管理
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState<RegistrationData>({
    email,
    password: '',
    confirmPassword: '',
    name: '',
    nameKana: '',
    phone: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    building: '',
    birthdate: null,
    emergencyName: '',
    emergencyNameKana: '',
    emergencyPhone: '',
    emergencyRelation: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 入力フィールドの変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // エラー状態をクリア
      if (errors[name as keyof RegistrationData]) {
        setErrors({
          ...errors,
          [name]: undefined
        });
      }
    }
  };
  
  // 日付変更ハンドラ
  const handleDateChange = (date: Date | null, field: 'birthdate') => {
    setFormData({
      ...formData,
      [field]: date
    });
    
    // エラー状態をクリア
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined
      });
    }
  };

  // 登録処理（擬似的な実装）
  const registerUser = async (userData: RegistrationData): Promise<string> => {
    // 実際の実装ではAPIサーバーにリクエストを行う
    return new Promise((resolve) => {
      // API呼び出しの遅延をシミュレート
      setTimeout(() => {
        resolve('user_' + Math.floor(Math.random() * 1000));
      }, 1000);
    });
  };

  // ステップ1のバリデーション
  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};
    
    if (!formData.name) {
      newErrors.name = 'お名前を入力してください';
    }
    
    if (!formData.nameKana) {
      newErrors.nameKana = 'お名前（カナ）を入力してください';
    }
    
    if (!formData.phone) {
      newErrors.phone = '電話番号を入力してください';
    }
    
    if (!formData.birthdate) {
      newErrors.birthdate = '生年月日を入力してください';
    }
    
    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (formData.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません';
    }
    
    if (!formData.postalCode) {
      newErrors.postalCode = '郵便番号を入力してください';
    }
    
    if (!formData.prefecture) {
      newErrors.prefecture = '都道府県を選択してください';
    }
    
    if (!formData.city) {
      newErrors.city = '市区町村を入力してください';
    }
    
    if (!formData.address) {
      newErrors.address = '番地を入力してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // ステップ2のバリデーション
  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};
    
    if (!formData.emergencyName) {
      newErrors.emergencyName = '緊急連絡先の氏名を入力してください';
    }
    
    if (!formData.emergencyNameKana) {
      newErrors.emergencyNameKana = '緊急連絡先の氏名（カナ）を入力してください';
    }
    
    if (!formData.emergencyPhone) {
      newErrors.emergencyPhone = '緊急連絡先の電話番号を入力してください';
    }
    
    if (!formData.emergencyRelation) {
      newErrors.emergencyRelation = '続柄を選択してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォームのバリデーション
  const validateForm = (): boolean => {
    if (activeStep === 0) {
      return validateStep1();
    } else if (activeStep === 1) {
      return validateStep2();
    }
    return true;
  };

  // 次へ進むハンドラ
  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  // 戻るハンドラ
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const userId = await registerUser(formData);
      setSubmitted(true);
      // 3秒後に登録成功ハンドラーを呼び出す（UIフィードバックのため）
      setTimeout(() => {
        onRegisterSuccess(userId);
      }, 2000);
    } catch (err) {
      setErrors({
        ...errors,
        email: 'アカウント登録に失敗しました。もう一度お試しください。'
      });
      console.error('Registration error:', err);
      setLoading(false);
    }
  };

  // 登録完了後の表示
  if (submitted) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            会員登録が完了しました
          </Typography>
          <Typography variant="body1" paragraph>
            アカウントの作成が完了しました。このままツアーの予約手続きに進みます。
          </Typography>
          <CircularProgress sx={{ mt: 2 }} />
        </Box>
      </Paper>
    );
  }

  const steps = ['基本情報', '緊急連絡先'];

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        新規会員登録
      </Typography>
      
      <Alert 
        severity="info" 
        sx={{ mb: 3 }}
        icon={<InfoIcon />}
      >
        <Typography variant="body2">
          <strong>{email}</strong> は新規登録可能です。以下の情報を入力して会員登録を完了してください。
        </Typography>
      </Alert>
      
      <Box sx={{ width: '100%', mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {activeStep === 0 ? (
          <>
            <Box 
              sx={{ 
                bgcolor: '#1976d2', 
                color: 'white', 
                py: 1.5, 
                px: 2, 
                borderRadius: '4px 4px 0 0',
                mb: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                代表者様情報
              </Typography>
            </Box>
            
            <Paper variant="outlined" sx={{ p: 3, mb: 4, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="お名前"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    placeholder="例：山田 太郎"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="nameKana"
                    label="お名前（カナ）"
                    fullWidth
                    required
                    value={formData.nameKana}
                    onChange={handleInputChange}
                    error={!!errors.nameKana}
                    helperText={errors.nameKana}
                    placeholder="例：ヤマダ タロウ"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="phone"
                    label="電話番号"
                    fullWidth
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    placeholder="例：090-1234-5678"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                    <DatePicker
                      label="生年月日"
                      value={formData.birthdate}
                      onChange={(date) => handleDateChange(date, 'birthdate')}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          error: !!errors.birthdate,
                          helperText: errors.birthdate
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Paper>
            
            <Box 
              sx={{ 
                bgcolor: '#1976d2', 
                color: 'white', 
                py: 1.5, 
                px: 2, 
                borderRadius: '4px 4px 0 0',
                mb: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                ご住所情報
              </Typography>
            </Box>
            
            <Paper variant="outlined" sx={{ p: 3, mb: 4, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="postalCode"
                    label="郵便番号"
                    fullWidth
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    error={!!errors.postalCode}
                    helperText={errors.postalCode}
                    placeholder="例：123-4567"
                  />
                </Grid>
                
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth required error={!!errors.prefecture}>
                    <InputLabel id="prefecture-label">都道府県</InputLabel>
                    <Select
                      labelId="prefecture-label"
                      name="prefecture"
                      value={formData.prefecture}
                      onChange={handleInputChange}
                      label="都道府県"
                    >
                      {prefectures.map((pref) => (
                        <MenuItem key={pref} value={pref}>{pref}</MenuItem>
                      ))}
                    </Select>
                    {errors.prefecture && <FormHelperText>{errors.prefecture}</FormHelperText>}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    name="city"
                    label="市区町村"
                    fullWidth
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    placeholder="例：中央区銀座"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    label="番地"
                    fullWidth
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    placeholder="例：1-2-3"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    name="building"
                    label="建物名・部屋番号"
                    fullWidth
                    value={formData.building}
                    onChange={handleInputChange}
                    placeholder="例：〇〇マンション 101号室"
                  />
                </Grid>
              </Grid>
            </Paper>
            
            <Box 
              sx={{ 
                bgcolor: '#1976d2', 
                color: 'white', 
                py: 1.5, 
                px: 2, 
                borderRadius: '4px 4px 0 0',
                mb: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                アカウント情報
              </Typography>
            </Box>
            
            <Paper variant="outlined" sx={{ p: 3, mb: 4, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="メールアドレス"
                    type="email"
                    fullWidth
                    required
                    value={formData.email}
                    disabled // メールアドレスは変更不可
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="password"
                    label="パスワード"
                    type="password"
                    fullWidth
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password || 'パスワードは8文字以上で入力してください'}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="confirmPassword"
                    label="パスワード（確認用）"
                    type="password"
                    fullWidth
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
                </Grid>
              </Grid>
            </Paper>
          </>
        ) : (
          <>
            <Box 
              sx={{ 
                bgcolor: '#1976d2', 
                color: 'white', 
                py: 1.5, 
                px: 2, 
                borderRadius: '4px 4px 0 0',
                mb: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                緊急連絡先
              </Typography>
            </Box>
            
            <Paper variant="outlined" sx={{ p: 3, mb: 4, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="emergencyName"
                    label="氏名"
                    fullWidth
                    required
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    error={!!errors.emergencyName}
                    helperText={errors.emergencyName}
                    placeholder="例：山田 花子"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="emergencyNameKana"
                    label="氏名（カナ）"
                    fullWidth
                    required
                    value={formData.emergencyNameKana}
                    onChange={handleInputChange}
                    error={!!errors.emergencyNameKana}
                    helperText={errors.emergencyNameKana}
                    placeholder="例：ヤマダ ハナコ"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="emergencyPhone"
                    label="電話番号"
                    fullWidth
                    required
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    error={!!errors.emergencyPhone}
                    helperText={errors.emergencyPhone}
                    placeholder="例：090-1234-5678"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!errors.emergencyRelation}>
                    <InputLabel id="emergency-relation-label">続柄</InputLabel>
                    <Select
                      labelId="emergency-relation-label"
                      name="emergencyRelation"
                      value={formData.emergencyRelation}
                      onChange={handleInputChange}
                      label="続柄"
                    >
                      {relations.map((relation) => (
                        <MenuItem key={relation} value={relation}>{relation}</MenuItem>
                      ))}
                    </Select>
                    {errors.emergencyRelation && <FormHelperText>{errors.emergencyRelation}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {activeStep === 0 ? (
            <Button
              variant="outlined"
              onClick={onBackToEmailCheck}
              sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
            >
              メールアドレス入力に戻る
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
            >
              基本情報に戻る
            </Button>
          )}
          
          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
            >
              {loading ? <CircularProgress size={24} /> : '登録して次へ進む'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
            >
              次へ進む
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default RegisterComponent;