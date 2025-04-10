import { TourPlan } from '../types';

export const samplePlans: TourPlan[] = Array(8).fill(null).map((_, index) => ({
  id: (index + 1).toString(),
  title: '【宿泊】栗林公園に咲く"恋つづじ"と瀬戸内ビューの絶景ホテル休暇村讃岐五色台',
  stayDuration: 'お宿泊満たっぷり17時間！海側のお部屋確約◎',
  courseNumber: 'OOOOOOO',
  businessTripType: '乗務員同行',
  price: 12980,
  departurePlace: '芸陽バス本社/西条駅',
  destination: '香川県',
  capacity: '募集人員40名',
  minCapacity: '(最小催行人員20名)',
  meals: {
    breakfast: 0,
    lunch: 0,
    dinner: 0
  }
}));
