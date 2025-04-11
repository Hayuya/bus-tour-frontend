import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

const RegistrationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleSubmit = (formData: any) => {
    console.log('フォーム送信データ:', formData);
    // TODO: 後ほどAxiosでバックエンド送信処理を実装
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">予約フォーム（ツアーID: {id}）</h2>
      <BookingForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RegistrationPage;
