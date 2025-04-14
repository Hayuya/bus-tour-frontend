// 共通の型定義をここにまとめる

// ConditionTableコンポーネント用の型定義
export interface ConditionItem {
  title: string;
  content: React.ReactNode;
}

// ツアー詳細データの型定義
export interface TourDetail {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  highlights: string[];
  imageUrl?: string;
}

// 行程データの型定義
export interface ActivityItem {
  time: string; 
  activity: string;
  details?: string;
}

export interface DaySchedule {
  dayNumber: string;
  schedule: ActivityItem[];
}

export interface Itinerary {
  id: number;
  days: DaySchedule[];
}

// 条件データの型定義
export interface CancellationPolicy {
  daysBefore: string;
  charge: string;
}

export interface TourCondition {
  id: number;
  conditions: {
    courseType: string;
    minimumParticipants: string;
    tourGuide: string;
    busType: string;
    accommodation: string;
    meals: string;
    applicationDeadline: string;
    cancellationType: string;
    cancellationPolicy: CancellationPolicy[];
  };
}

// ツアープランデータの型定義
export interface TourPlan {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  departure: string;
  destination: string;
  participants: string;
  meals: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
}

// カレンダーデータの型定義
export interface TourDate {
  date: string; // YYYY-MM-DD形式
  price: number;
  available: boolean;
  remainingSeats: number;
  status: 'available' | 'few' | 'soldout' | 'closed'; // available: 予約可能, few: 残席わずか, soldout: 満席, closed: 催行中止
}

export interface TourCalendarData {
  tourId: number;
  dates: TourDate[];
}