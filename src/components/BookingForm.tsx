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
  StepLabel,
  Paper,
  IconButton,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';

interface BookingFormProps {
  onSubmit: (formData: any) => void;
  tourId: number;
  userData?: {
    userId: string;
    name: string;
    nameKana: string;
    birthdate: Date | null;
  };
}

interface CompanionInfo {
  name: string;
  nameKana: string;
  birthdate: Date | null;
}

interface FormData {
  // 同行者情報
  companions: CompanionInfo[];
  
  // 保険加入
  insuranceOption: string;
  
  // 乗降車場所
  boardingLocation: string;
  dropOffLocation: string;
  
  // その他
  specialRequests: string;
  
  // 予約の承認
  termsAndConditions: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  onSubmit, 
  tourId,
  userData = {
    userId: 'dummy_id',
    name: '山田 太郎',
    nameKana: 'ヤマダ タロウ',
    birthdate: new Date(1980, 0, 1)
  }
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    companions: [],
    insuranceOption: 'apply',
    boardingLocation: '',
    dropOffLocation: '',
    specialRequests: '',
    termsAndConditions: false
  });
  
  const [errors, setErrors] = useState<{
    companions?: Record<number, Partial<Record<keyof CompanionInfo, string>>>;
    boardingLocation?: string;
    dropOffLocation?: string;
    termsAndConditions?: string;
  }>({});

  // 同行者の追加
  const addCompanion = () => {
    setFormData({
      ...formData,
      companions: [
        ...formData.companions,
        { name: '', nameKana: '', birthdate: null }
      ]
    });
  };

  // 同行者の削除
  const removeCompanion = (index: number) => {
    const newCompanions = [...formData.companions];
    newCompanions.splice(index, 1);
    
    setFormData({
      ...formData,
      companions: newCompanions
    });
    
    // エラー状態も更新
    if (errors.companions && errors.companions[index]) {
      const newErrors = { ...errors };
      const newCompanionErrors = { ...newErrors.companions } as Record<number, any>;
      delete newCompanionErrors[index];
      
      // インデックスを詰める
      const updatedCompanionErrors: Record<number, any> = {};
      Object.keys(newCompanionErrors).forEach((key) => {
        const keyIndex = parseInt(key);
        if (keyIndex > index) {
          updatedCompanionErrors[keyIndex - 1] = newCompanionErrors[keyIndex];
        } else {
          updatedCompanionErrors[keyIndex] = newCompanionErrors[keyIndex];
        }
      });
      
      newErrors.companions = updatedCompanionErrors;
      setErrors(newErrors);
    }
  };

  // 同行者情報の入力ハンドラ
  const handleCompanionChange = (index: number, field: keyof CompanionInfo, value: any) => {
    const newCompanions = [...formData.companions];
    newCompanions[index] = {
      ...newCompanions[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      companions: newCompanions
    });
    
    // エラー状態をクリア
    if (errors.companions && errors.companions[index] && errors.companions[index][field]) {
      const newErrors = { ...errors };
      if (!newErrors.companions) {
        newErrors.companions = {};
      }
      
      if (!newErrors.companions[index]) {
        newErrors.companions[index] = {};
      }
      
      newErrors.companions[index] = {
        ...newErrors.companions[index],
        [field]: undefined
      };
      
      setErrors(newErrors);
    }
  };

  // チェックボックスの変更ハンドラ
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
    
    // エラー状態をクリア
    if (name === 'termsAndConditions' && errors.termsAndConditions) {
      setErrors({
        ...errors,
        termsAndConditions: undefined
      });
    }
  };

  // ラジオボタンやセレクトの変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // エラー状態をクリア
      if (name === 'boardingLocation' && errors.boardingLocation) {
        setErrors({
          ...errors,
          boardingLocation: undefined
        });
      } else if (name === 'dropOffLocation' && errors.dropOffLocation) {
        setErrors({
          ...errors,
          dropOffLocation: undefined
        });
      }
    }
  };

  // テキストフィールドの変更ハンドラ
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // ステップ1のバリデーション
  const validateStep1 = (): boolean => {
    const newErrors: {
      companions?: Record<number, Partial<Record<keyof CompanionInfo, string>>>;
    } = {};
    let isValid = true;
    
    // 同行者情報のバリデーション
    if (formData.companions.length > 0) {
      newErrors.companions = {};
      
      formData.companions.forEach((companion, index) => {
        const companionErrors: Partial<Record<keyof CompanionInfo, string>> = {};
        
        if (!companion.name) {
          companionErrors.name = 'お名前を入力してください';
          isValid = false;
        }
        
        if (!companion.nameKana) {
          companionErrors.nameKana = 'お名前（カナ）を入力してください';
          isValid = false;
        }
        
        if (!companion.birthdate) {
          companionErrors.birthdate = '生年月日を入力してください';
          isValid = false;
        }
        
        if (Object.keys(companionErrors).length > 0) {
          newErrors.companions[index] = companionErrors;
        }
      });
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // ステップ2のバリデーション
  const validateStep2 = (): boolean => {
    const newErrors: {
      boardingLocation?: string;
      dropOffLocation?: string;
    } = {};
    let isValid = true;
    
    if (!formData.boardingLocation) {
      newErrors.boardingLocation = '乗車場所を選択してください';
      isValid = false;
    }
    
    if (!formData.dropOffLocation) {
      newErrors.dropOffLocation = '降車場所を選択してください';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // ステップ3のバリデーション
  const validateStep3 = (): boolean => {
    const newErrors: {
      termsAndConditions?: string;
    } = {};
    let isValid = true;
    
    if (!formData.termsAndConditions) {
      newErrors.termsAndConditions = '予約確定には利用規約への同意が必要です';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // 現在のステップに応じてバリデーションを実行
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return validateStep1();
      case 1:
        return validateStep2();
      case 2:
        return validateStep3();
      default:
        return true;
    }
  };
  
  // 次へ進むハンドラ
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  
  // 戻るハンドラ
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  // フォーム送信ハンドラ
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep(activeStep)) {
      setSubmitting(true);
      
      // 送信データを準備
      const submissionData = {
        ...formData,
        tourId,
        userId: userData.userId
      };
      
      // 送信処理（擬似的な遅延を追加）
      setTimeout(() => {
        onSubmit(submissionData);
        setSubmitting(false);
        setSubmitted(true);
      }, 1500);
    }
  };
  
  const steps = ['同行者情報', '乗降車場所', '確認・送信'];
  
  // 乗車場所のオプション
  const boardingLocations = [
    '芸陽バス本社（駐車場利用あり）',
    '芸陽バス本社（駐車場利用なし）',
    '西条駅南口',
    '広島駅'
  ];
  
  // 降車場所のオプション
  const dropOffLocations = [
    '芸陽バス本社',
    '西条駅南口',
    '広島駅'
  ];
  
  // 予約完了時の表示
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

  // 各ステップのコンテンツをレンダリング
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  代表者情報
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">代表者氏名</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">{userData.name}</Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">代表者氏名（カナ）</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">{userData.nameKana}</Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">生年月日</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">
                      {userData.birthdate ? userData.birthdate.toLocaleDateString('ja-JP') : '未設定'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  同行者情報
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={addCompanion}
                  variant="outlined"
                  size="small"
                >
                  同行者を追加
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              {formData.companions.length === 0 ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  同行者がいる場合は「同行者を追加」ボタンをクリックしてください
                </Alert>
              ) : (
                formData.companions.map((companion, index) => (
                  <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle2">同行者 {index + 1}</Typography>
                      <IconButton 
                        onClick={() => removeCompanion(index)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="氏名"
                          required
                          value={companion.name}
                          onChange={(e) => handleCompanionChange(index, 'name', e.target.value)}
                          error={!!(errors.companions && errors.companions[index]?.name)}
                          helperText={errors.companions && errors.companions[index]?.name}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="氏名（カナ）"
                          required
                          value={companion.nameKana}
                          onChange={(e) => handleCompanionChange(index, 'nameKana', e.target.value)}
                          error={!!(errors.companions && errors.companions[index]?.nameKana)}
                          helperText={errors.companions && errors.companions[index]?.nameKana}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                          <DatePicker
                            label="生年月日"
                            value={companion.birthdate}
                            onChange={(date) => handleCompanionChange(index, 'birthdate', date)}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                required: true,
                                error: !!(errors.companions && errors.companions[index]?.birthdate),
                                helperText: errors.companions && errors.companions[index]?.birthdate
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Box>
                ))
              )}
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                保険加入について
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">旅行傷害保険への加入</FormLabel>
                <RadioGroup
                  name="insuranceOption"
                  value={formData.insuranceOption}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel value="apply" control={<Radio />} label="申し込む（+500円）" />
                  <FormControlLabel value="not_apply" control={<Radio />} label="申し込まない" />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                乗降車場所
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required error={!!errors.boardingLocation} sx={{ mb: 2 }}>
                    <InputLabel id="boarding-location-label">乗車場所</InputLabel>
                    <Select
                      labelId="boarding-location-label"
                      name="boardingLocation"
                      value={formData.boardingLocation}
                      onChange={handleInputChange}
                      label="乗車場所"
                    >
                      {boardingLocations.map((location) => (
                        <MenuItem key={location} value={location}>{location}</MenuItem>
                      ))}
                    </Select>
                    {errors.boardingLocation && <FormHelperText>{errors.boardingLocation}</FormHelperText>}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required error={!!errors.dropOffLocation} sx={{ mb: 2 }}>
                    <InputLabel id="drop-off-location-label">降車場所</InputLabel>
                    <Select
                      labelId="drop-off-location-label"
                      name="dropOffLocation"
                      value={formData.dropOffLocation}
                      onChange={handleInputChange}
                      label="降車場所"
                    >
                      {dropOffLocations.map((location) => (
                        <MenuItem key={location} value={location}>{location}</MenuItem>
                      ))}
                    </Select>
                    {errors.dropOffLocation && <FormHelperText>{errors.dropOffLocation}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                備考欄
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <TextField
                name="specialRequests"
                label="ご不明点や、ご要望があればご記入ください"
                multiline
                rows={4}
                fullWidth
                value={formData.specialRequests}
                onChange={handleTextChange}
              />
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                予約内容の確認
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9', mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">代表者氏名</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">{userData.name}</Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">同行者</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    {formData.companions.length === 0 ? (
                      <Typography variant="body2">なし</Typography>
                    ) : (
                      formData.companions.map((companion, index) => (
                        <Typography key={index} variant="body2">
                          {companion.name}（{companion.nameKana}）
                        </Typography>
                      ))
                    )}
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">保険加入</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">
                      {formData.insuranceOption === 'apply' ? '申し込む（+500円）' : '申し込まない'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">乗車場所</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">{formData.boardingLocation}</Typography>
                  </Grid>
                  
                  <Grid item xs={4} sm={3}>
                    <Typography variant="body2" color="text.secondary">降車場所</Typography>
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography variant="body2">{formData.dropOffLocation}</Typography>
                  </Grid>
                  
                  {formData.specialRequests && (
                    <>
                      <Grid item xs={4} sm={3}>
                        <Typography variant="body2" color="text.secondary">備考</Typography>
                      </Grid>
                      <Grid item xs={8} sm={9}>
                        <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                          {formData.specialRequests}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
              
              <FormGroup>
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

  // フォームのレンダリング
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
            {submitting ? <CircularProgress size={24} /> : '予約を確定する'}
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