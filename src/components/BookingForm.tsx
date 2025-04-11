// src/components/BookingForm.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Button, 
  Typography, 
  Divider,
  MenuItem,
  Checkbox,
  FormGroup,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';

interface BookingFormProps {
  onSubmit: (formData: any) => void;
  tourId: number;
}

interface FormData {
  representativeName: string;
  representativeNameKana: string;
  email: string;
  confirmEmail: string;
  phone: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  reservationDate: Date | null;
  numberOfAdults: string;
  numberOfChildren: string;
  paymentMethod: string;
  emergencyContact: string;
  specialRequests: string;
  privacyPolicy: boolean;
  termsAndConditions: boolean;
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

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, tourId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    representativeName: '',
    representativeNameKana: '',
    email: '',
    confirmEmail: '',
    phone: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    building: '',
    reservationDate: null,
    numberOfAdults: '1',
    numberOfChildren: '0',
    paymentMethod: 'credit_card',
    emergencyContact: '',
    specialRequests: '',
    privacyPolicy: false,
    termsAndConditions: false
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // エラー状態をクリア
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
    
    // エラー状態をクリア
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      reservationDate: date
    });
    
    // エラー状態をクリア
    if (errors.reservationDate) {
      setErrors({
        ...errors,
        reservationDate: undefined
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (step === 0) {
      if (!formData.representativeName) {
        newErrors.representativeName = '代表者氏名を入力してください';
      }
      
      if (!formData.representativeNameKana) {
        newErrors.representativeNameKana = '代表者氏名（カナ）を入力してください';
      }
      
      if (!formData.email) {
        newErrors.email = 'メールアドレスを入力してください';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = '有効なメールアドレスを入力してください';
      }
      
      if (formData.email !== formData.confirmEmail) {
        newErrors.confirmEmail = 'メールアドレスが一致しません';
      }
      
      if (!formData.phone) {
        newErrors.phone = '電話番号を入力してください';
      }
    }
    
    if (step === 1) {
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
      
      if (!formData.reservationDate) {
        newErrors.reservationDate = '予約日を選択してください';
      }
    }
    
    if (step === 2) {
      if (!formData.privacyPolicy) {
        newErrors.privacyPolicy = 'プライバシーポリシーに同意してください';
      }
      
      if (!formData.termsAndConditions) {
        newErrors.termsAndConditions = '利用規約に同意してください';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep(activeStep)) {
      setSubmitting(true);
      
      // 送信データを準備
      const submissionData = {
        ...formData,
        tourId
      };
      
      // 送信処理（擬似的な遅延を追加）
      setTimeout(() => {
        onSubmit(submissionData);
        setSubmitting(false);
        setSubmitted(true);
      }, 1500);
    }
  };

  const steps = ['基本情報', '予約詳細', '確認・送信'];

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                代表者情報
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="representativeName"
                label="代表者氏名"
                fullWidth
                required
                value={formData.representativeName}
                onChange={handleInputChange}
                error={!!errors.representativeName}
                helperText={errors.representativeName}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="representativeNameKana"
                label="代表者氏名（カナ）"
                fullWidth
                required
                value={formData.representativeNameKana}
                onChange={handleInputChange}
                error={!!errors.representativeNameKana}
                helperText={errors.representativeNameKana}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="email"
                label="メールアドレス"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="confirmEmail"
                label="メールアドレス（確認用）"
                type="email"
                fullWidth
                required
                value={formData.confirmEmail}
                onChange={handleInputChange}
                error={!!errors.confirmEmail}
                helperText={errors.confirmEmail}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="phone"
                label="電話番号"
                fullWidth
                required
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
          </Grid>
        );
        
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                住所情報
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
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
                placeholder="123-4567"
              />
            </Grid>
            
            <Grid item xs={12} sm={8}>
              <TextField
                name="prefecture"
                label="都道府県"
                select
                fullWidth
                required
                value={formData.prefecture}
                onChange={handleInputChange}
                error={!!errors.prefecture}
                helperText={errors.prefecture}
              >
                {prefectures.map((pref) => (
                  <MenuItem key={pref} value={pref}>{pref}</MenuItem>
                ))}
              </TextField>
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
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="building"
                label="建物名・部屋番号"
                fullWidth
                value={formData.building}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                予約情報
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                <DatePicker
                  label="予約日"
                  value={formData.reservationDate}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!errors.reservationDate,
                      helperText: errors.reservationDate
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={6} sm={3}>
              <TextField
                name="numberOfAdults"
                label="大人"
                type="number"
                fullWidth
                required
                InputProps={{ inputProps: { min: 1 } }}
                value={formData.numberOfAdults}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={6} sm={3}>
              <TextField
                name="numberOfChildren"
                label="子供"
                type="number"
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
                value={formData.numberOfChildren}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">お支払い方法</FormLabel>
                <RadioGroup
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel value="credit_card" control={<Radio />} label="クレジットカード" />
                  <FormControlLabel value="bank_transfer" control={<Radio />} label="銀行振込" />
                  <FormControlLabel value="convenience_store" control={<Radio />} label="コンビニ払い" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        );
        
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                追加情報
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="emergencyContact"
                label="緊急連絡先"
                fullWidth
                value={formData.emergencyContact}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="specialRequests"
                label="特別なご要望"
                multiline
                rows={4}
                fullWidth
                value={formData.specialRequests}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                予約内容の確認
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">代表者氏名</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">{formData.representativeName}</Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">メールアドレス</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">{formData.email}</Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">電話番号</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">{formData.phone}</Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">住所</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">
                      〒{formData.postalCode} {formData.prefecture}{formData.city}{formData.address} {formData.building}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">予約日</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">
                      {formData.reservationDate ? formData.reservationDate.toLocaleDateString('ja-JP') : '未選択'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">人数</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">
                      大人: {formData.numberOfAdults}名 / 子供: {formData.numberOfChildren}名
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">お支払い方法</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">
                      {formData.paymentMethod === 'credit_card' ? 'クレジットカード' : 
                       formData.paymentMethod === 'bank_transfer' ? '銀行振込' : 'コンビニ払い'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="privacyPolicy"
                      checked={formData.privacyPolicy}
                      onChange={handleCheckboxChange}
                      color="primary"
                    />
                  }
                  label="プライバシーポリシーに同意します"
                />
                {errors.privacyPolicy && (
                  <Typography variant="caption" color="error">
                    {errors.privacyPolicy}
                  </Typography>
                )}
                
                <FormControlLabel
                  control={
                    <Checkbox
                      name="termsAndConditions"
                      checked={formData.termsAndConditions}
                      onChange={handleCheckboxChange}
                      color="primary"
                    />
                  }
                  label="利用規約に同意します"
                />
                {errors.termsAndConditions && (
                  <Typography variant="caption" color="error">
                    {errors.termsAndConditions}
                  </Typography>
                )}
              </FormGroup>
            </Grid>
          </Grid>
        );
        
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>
          予約リクエストを受け付けました
        </Typography>
        <Typography variant="body1" paragraph>
          ご予約ありがとうございます。確認メールをお送りしましたので、ご確認ください。
        </Typography>
        <Typography variant="body2" color="text.secondary">
          予約番号: TRX-{tourId}-{Math.floor(Math.random() * 10000)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/"
          sx={{ mt: 4 }}
        >
          トップページに戻る
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmitForm}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {renderStepContent(activeStep)}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          戻る
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? '送信中...' : '予約を確定する'}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
          >
            次へ
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default BookingForm;

// Note: You'll need to install @mui/x-date-pickers and date-fns:
// npm install @mui/x-date-pickers date-fns