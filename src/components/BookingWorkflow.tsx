// src/components/BookingWorkflow.tsx
import React, { useState } from 'react';
import { Box } from '@mui/material';

import EmailCheckComponent from './EmailCheckComponent';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import BookingForm from './BookingForm';

interface BookingWorkflowProps {
  tourId: number;
  tourName: string;
}

// ワークフローの状態を表す型
type WorkflowState = 
  | 'EMAIL_CHECK' 
  | 'LOGIN' 
  | 'REGISTER' 
  | 'BOOKING';

const BookingWorkflow: React.FC<BookingWorkflowProps> = ({ tourId, tourName }) => {
  // ワークフローの状態管理
  const [workflowState, setWorkflowState] = useState<WorkflowState>('EMAIL_CHECK');
  
  // ユーザー情報の状態管理
  const [userInfo, setUserInfo] = useState<{
    userId?: string;
    email?: string;
    name?: string;
    nameKana?: string;
    phone?: string;
    birthdate?: Date | null;
  }>({});

  // メールチェック後に既存ユーザーの場合の処理
  const handleExistingUser = (userId: string, email: string) => {
    setUserInfo({ userId, email });
    setWorkflowState('LOGIN');
  };

  // メールチェック後に新規ユーザーの場合の処理
  const handleNewUser = (email: string) => {
    setUserInfo({ email });
    setWorkflowState('REGISTER');
  };

  // メール入力画面に戻る処理
  const handleBackToEmailCheck = () => {
    setWorkflowState('EMAIL_CHECK');
  };

  // ログイン成功時の処理
  const handleLoginSuccess = (userData: any) => {
    setUserInfo({
      ...userInfo,
      userId: userData.userId,
      name: userData.name,
      nameKana: userData.nameKana,
      phone: userData.phone,
      birthdate: userData.birthdate
    });
    setWorkflowState('BOOKING');
  };

  // 登録成功時の処理
  const handleRegisterSuccess = (userData: any) => {
    setUserInfo({
      ...userInfo,
      userId: userData.userId,
      name: userData.name,
      nameKana: userData.nameKana,
      phone: userData.phone,
      birthdate: userData.birthdate
    });
    setWorkflowState('BOOKING');
  };

  // 予約フォーム送信時の処理
  const handleBookingSubmit = (formData: any) => {
    // 実際の実装ではAPIサーバーに予約データを送信
    console.log('Booking submitted:', { ...formData, userId: userInfo.userId });
    // ここでは何もせず、BookingFormコンポーネントの内部処理に任せる
  };

  // 現在のワークフロー状態に基づいてコンポーネントをレンダリング
  const renderCurrentStep = () => {
    switch (workflowState) {
      case 'EMAIL_CHECK':
        return (
          <EmailCheckComponent
            onExistingUser={handleExistingUser}
            onNewUser={handleNewUser}
          />
        );
      
      case 'LOGIN':
        return (
          <LoginComponent
            email={userInfo.email || ''}
            onLoginSuccess={handleLoginSuccess}
            onBackToEmailCheck={handleBackToEmailCheck}
          />
        );
      
      case 'REGISTER':
        return (
          <RegisterComponent
            email={userInfo.email || ''}
            onRegisterSuccess={handleRegisterSuccess}
            onBackToEmailCheck={handleBackToEmailCheck}
          />
        );
      
      case 'BOOKING':
        return (
          <BookingForm
            onSubmit={handleBookingSubmit}
            tourId={tourId}
            userData={{
              userId: userInfo.userId || '',
              name: userInfo.name || '',
              nameKana: userInfo.nameKana || '',
              birthdate: userInfo.birthdate
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Box>
      {renderCurrentStep()}
    </Box>
  );
};

export default BookingWorkflow;