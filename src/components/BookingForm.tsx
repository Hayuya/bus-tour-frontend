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
import PersonIcon from '@mui/icons-material/Person';
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
              <Box sx={{ 
                bgcolor: '#1976d2',
                color: 'white',
                py: 1.5,
                px: 2,
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'center',
                mb: 0
              }}>
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  代表者様情報
                </Typography>
              </Box>
              
              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9', mb: 3, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">代表者氏名</Typography>
                    <Typography variant="body1" fontWeight="medium" sx={{ mb: 2 }}>{userData.name}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">代表者氏名（カナ）</Typography>
                    <Typography variant="body1" fontWeight="medium" sx={{ mb: 2 }}>{userData.nameKana}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">生年月日</Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {userData.birthdate ? userData.birthdate.toLocaleDateString('ja-JP') : '未設定'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ 
                bgcolor: '#1976d2',
                color: 'white',
                py: 1.5,
                px: 2,
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 0
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    同行者様情報
                  </Typography>
                </Box>
              </Box>
              
              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9', mb: 3, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                {formData.companions.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      同行者様がいらっしゃる場合は「同行者を追加」ボタンをクリックしてください
                    </Alert>
                    <Button
                      startIcon={<AddIcon />}
                      onClick={addCompanion}
                      variant="contained"
                      size="large"
                      sx={{ fontSize: '1rem', py: 1.5, px: 4 }}
                    >
                      同行者を追加
                    </Button>
                  </Box>
                ) : (
                  <>
                    {formData.companions.map((companion, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          mb: 4, 
                          pb: 3,
                          borderBottom: index < formData.companions.length - 1 ? '1px dashed #ccc' : 'none'
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ 
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            color: '#1976d2',
                            display: 'flex',
                            alignItems: 'center'
                          }}>
                            <PersonIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                            同行者 {index + 1}
                          </Typography>
                          <Button 
                            onClick={() => removeCompanion(index)}
                            size="small"
                            color="error"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                          >
                            削除
                          </Button>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" fontWeight="medium" color="text.secondary" gutterBottom>
                            氏名
                          </Typography>
                          <TextField
                            fullWidth
                            placeholder="例：山田 太郎"
                            required
                            size="medium"
                            value={companion.name}
                            onChange={(e) => handleCompanionChange(index, 'name', e.target.value)}
                            error={!!(errors.companions && errors.companions[index]?.name)}
                            helperText={errors.companions && errors.companions[index]?.name}
                            sx={{ mb: 2 }}
                          />
                          
                          <Typography variant="body2" fontWeight="medium" color="text.secondary" gutterBottom>
                            氏名（カナ）
                          </Typography>
                          <TextField
                            fullWidth
                            placeholder="例：ヤマダ タロウ"
                            required
                            size="medium"
                            value={companion.nameKana}
                            onChange={(e) => handleCompanionChange(index, 'nameKana', e.target.value)}
                            error={!!(errors.companions && errors.companions[index]?.nameKana)}
                            helperText={errors.companions && errors.companions[index]?.nameKana}
                            sx={{ mb: 2 }}
                          />
                          
                          <Typography variant="body2" fontWeight="medium" color="text.secondary" gutterBottom>
                            生年月日
                          </Typography>
                          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                            <DatePicker
                              value={companion.birthdate}
                              onChange={(date) => handleCompanionChange(index, 'birthdate', date)}
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  required: true,
                                  size: "medium",
                                  error: !!(errors.companions && errors.companions[index]?.birthdate),
                                  helperText: errors.companions && errors.companions[index]?.birthdate
                                }
                              }}
                            />
                          </LocalizationProvider>
                        </Box>
                      </Box>
                    ))}
                    
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Button
                        startIcon={<AddIcon />}
                        onClick={addCompanion}
                        variant="contained"
                        size="large"
                        sx={{ fontSize: '1rem', py: 1.5, px: 4 }}
                      >
                        同行者を追加
                      </Button>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ 
                bgcolor: '#1976d2',
                color: 'white',
                py: 1.5,
                px: 2,
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'center',
                mb: 0
              }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  保険加入について
                </Typography>
              </Box>
              
              <Paper variant="outlined" sx={{ p: 3, bgcolor: '#f9f9f9', mb: 3, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="insuranceOption"
                    value={formData.insuranceOption}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel 
                      value="apply" 
                      control={<Radio />} 
                      label={<Typography sx={{ fontSize: '1rem' }}>申し込む（+500円）</Typography>} 
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel 
                      value="not_apply" 
                      control={<Radio />} 
                      label={<Typography sx={{ fontSize: '1rem' }}>申し込まない</Typography>} 
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ 
                bgcolor: '#1976d2',
                color: 'white',
                py: 1.5,
                px: 2,
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'center',
                mb: 0
              }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  乗降車場所
                </Typography>
              </Box>
              
              <Paper variant="outlined" sx={{ p: 3, bgcolor: '#f9f9f9', mb: 3, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="body1" fontWeight="medium" gutterBottom>
                      乗車場所
                    </Typography>
                    <FormControl fullWidth required error={!!errors.boardingLocation} sx={{ mb: 3 }}>
                      <Select
                        name="boardingLocation"
                        value={formData.boardingLocation}
                        onChange={handleInputChange}
                        displayEmpty
                      >
                        <MenuItem disabled value="">
                          乗車場所を選択してください
                        </MenuItem>
                        {boardingLocations.map((location) => (
                          <MenuItem key={location} value={location}>{location}</MenuItem>
                        ))}
                      </Select>
                      {errors.boardingLocation && <FormHelperText>{errors.boardingLocation}</FormHelperText>}
                    </FormControl>
                  
                    <Typography variant="body1" fontWeight="medium" gutterBottom>
                      降車場所
                    </Typography>
                    <FormControl fullWidth required error={!!errors.dropOffLocation}>
                      <Select
                        name="dropOffLocation"
                        value={formData.dropOffLocation}
                        onChange={handleInputChange}
                        displayEmpty
                      >
                        <MenuItem disabled value="">
                          降車場所を選択してください
                        </MenuItem>
                        {dropOffLocations.map((location) => (
                          <MenuItem key={location} value={location}>{location}</MenuItem>
                        ))}
                      </Select>
                      {errors.dropOffLocation && <FormHelperText>{errors.dropOffLocation}</FormHelperText>}
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ 
                bgcolor: '#1976d2',
                color: 'white',
                py: 1.5,
                px: 2,
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'center',
                mb: 0
              }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  備考欄
                </Typography>
              </Box>
              
              <Paper variant="outlined" sx={{ p: 3, bgcolor: '#f9f9f9', mb: 3, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <TextField
                  name="specialRequests"
                  placeholder="ご不明点や、ご要望があればご記入ください"
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.specialRequests}
                  onChange={handleTextChange}
                />
              </Paper>
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ 
                bgcolor: '#1976d2',
                color: 'white',
                py: 1.5,
                px: 2,
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'center',
                mb: 0
              }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  予約内容の確認
                </Typography>
              </Box>
              
              <Paper variant="outlined" sx={{ p: 3, bgcolor: '#f9f9f9', mb: 3, borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: 'white' }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    代表者
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userData.name}
                  </Typography>
                </Box>
                
                {formData.companions.length > 0 && (
                  <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: 'white' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      同行者 ({formData.companions.length}名)
                    </Typography>
                    {formData.companions.map((companion, index) => (
                      <Typography key={index} variant="body1" sx={{ mb: index === formData.companions.length - 1 ? 0 : 1 }}>
                        {companion.name}（{companion.nameKana}）
                      </Typography>
                    ))}
                  </Box>
                )}
                
                <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: 'white' }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    保険・乗降車場所
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">保険加入</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {formData.insuranceOption === 'apply' ? '申し込む（+500円）' : '申し込まない'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">乗車場所</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {formData.boardingLocation}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">降車場所</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1">
                        {formData.dropOffLocation}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                {formData.specialRequests && (
                  <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: 'white' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      備考
                    </Typography>
                    <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                      {formData.specialRequests}
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ mt: 4, p: 3, border: '2px solid #1976d2', borderRadius: 2, bgcolor: '#e3f2fd' }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="termsAndConditions"
                          checked={formData.termsAndConditions}
                          onChange={handleCheckboxChange}
                          color="primary"
                          size="medium"
                        />
                      }
                      label={
                        <Typography variant="body1" fontWeight="medium">
                          利用規約に同意します
                        </Typography>
                      }
                    />
                    {errors.termsAndConditions && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {errors.termsAndConditions}
                      </Typography>
                    )}
                  </FormGroup>
                </Box>
              </Paper>
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
    <Stepper 
      activeStep={activeStep} 
      sx={{ 
        mb: 4,
        '& .MuiStepLabel-label': {
          fontSize: '1rem',
          fontWeight: 500
        },
        '& .MuiStepLabel-root.Mui-active .MuiStepLabel-label': {
          fontWeight: 'bold'
        }
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    
    {renderStepContent(activeStep)}
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid #e0e0e0' }}>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        variant="outlined"
        size="large"
        sx={{ 
          px: 4,
          fontSize: '1rem',
          minWidth: '120px'
        }}
      >
        戻る
      </Button>
      
      {activeStep === steps.length - 1 ? (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
          size="large"
          sx={{ 
            px: 4,
            fontSize: '1rem',
            fontWeight: 'bold',
            minWidth: '180px'
          }}
        >
          {submitting ? <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} /> : '予約を確定する'}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleNext}
          size="large"
          sx={{ 
            px: 4,
            fontSize: '1rem',
            minWidth: '120px'
          }}
        >
          次へ
        </Button>
      )}
    </Box>
  </Box>
);
};

export default BookingForm;