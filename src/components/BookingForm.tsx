import React, { useState } from 'react';

interface Participant {
  name: string;
  kana: string;
  birthdate: string;
}

const BookingForm: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([{ name: '', kana: '', birthdate: '' }]);

  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const addParticipant = () => {
    setParticipants([...participants, { name: '', kana: '', birthdate: '' }]);
  };

  return (
    <form className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">代表者情報</h2>
      <input type="text" placeholder="氏名" className="input" required />
      <input type="text" placeholder="カナ" className="input" required />
      <input type="tel" placeholder="電話番号" className="input" required />
      <input type="email" placeholder="メールアドレス" className="input" required />
      <input type="text" placeholder="住所" className="input" required />
      <input type="date" placeholder="生年月日" className="input" required />

      <h2 className="text-xl font-bold my-4">緊急連絡先</h2>
      <input type="text" placeholder="氏名" className="input" required />
      <input type="text" placeholder="カナ" className="input" required />
      <input type="tel" placeholder="電話番号" className="input" required />
      <input type="text" placeholder="続柄" className="input" required />

      <h2 className="text-xl font-bold my-4">同行者情報</h2>
      {participants.map((participant, index) => (
        <div key={index} className="mb-4 border p-2">
          <input
            type="text"
            placeholder="氏名"
            value={participant.name}
            onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
            className="input"
            required
          />
          <input
            type="text"
            placeholder="カナ"
            value={participant.kana}
            onChange={(e) => handleParticipantChange(index, 'kana', e.target.value)}
            className="input"
            required
          />
          <input
            type="date"
            placeholder="生年月日"
            value={participant.birthdate}
            onChange={(e) => handleParticipantChange(index, 'birthdate', e.target.value)}
            className="input"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addParticipant} className="btn">同行者を追加</button>

      <h2 className="text-xl font-bold my-4">保険加入について</h2>
      <label><input type="radio" name="insurance" required /> 申し込む</label>
      <label><input type="radio" name="insurance" required /> 申し込まない</label>

      <h2 className="text-xl font-bold my-4">乗車場所</h2>
      <select className="input">
        <option>芸陽バス本社（駐車場利用あり）</option>
        <option>芸陽バス本社（駐車場利用なし）</option>
        <option>西条駅南口</option>
        <option>広島駅</option>
      </select>

      <h2 className="text-xl font-bold my-4">降車場所</h2>
      <select className="input">
        <option>芸陽バス本社</option>
        <option>西条駅南口</option>
        <option>広島駅</option>
      </select>

      <h2 className="text-xl font-bold my-4">備考欄</h2>
      <textarea className="input" placeholder="ご不明点や、ご要望があればご記入ください" />

      <button type="submit" className="btn bg-blue-500 text-white mt-4">予約を確定する</button>
    </form>
  );
};

export default BookingForm;
