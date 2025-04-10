import { ItineraryDay } from '../types';

export const sampleItinerary: ItineraryDay[] = [
  {
    day: 1,
    schedule: [
      { time: '9:00発', place: '芸陽バス本社', description: '' },
      { time: '9:05発', place: '西条駅南口', description: '' },
      { description: '≪山陽・瀬戸中央道≫' },
      { description: '瀬戸大橋を間近に与島PA' },
      { description: '国指定有形文化財のお屋敷でうどん料理・郷屋敷' },
      { description: '屋島ドライブウェイ・上り？下り？ミステリー坂(車窓)' },
      { description: '84番札所・屋島寺・ガラス張りの曲線回廊「やしまーる」' },
      { description: '香川の老舗ローカル私鉄「ことでん」志度線にて乗車(琴電屋島駅⇒瓦町)' },
      {
        time: '16:00頃着',
        description: '3/27リニューアルオープンのホテルへ早めにチェックイン',
        notes: '※「水鏡テラス」「瀬戸内天空の絶景風呂」などリニューアル施設でゆっくりご滞在ください。'
      }
    ],
    meals: { breakfast: false, lunch: true, dinner: true }
  },
  {
    day: 2,
    schedule: [
      { time: '9:00発', place: 'ホテル', description: '' },
      { description: '特別名勝・栗林公園内でハート型に花をつける"恋つづじ"鑑賞' },
      { description: '日本の"ウユニ塩湖"と呼ばれSNSで話題の父ヶ浜(散策)' },
      { description: '日本の夕陽百選・有明浜に行む「琴弾回廊」で和食膳のランチ' },
      { description: '石垣の名城・丸亀城(入場)' },
      { description: '≪瀬戸中央・山陽道≫' },
      { time: '17:25着', place: '西条駅南口', description: '' },
      { time: '17:30着', place: '芸陽バス本社', description: '' }
    ],
    meals: { breakfast: true, lunch: true, dinner: false }
  }
];
