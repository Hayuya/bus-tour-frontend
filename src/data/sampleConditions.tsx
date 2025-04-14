import { TourCondition } from '../types';

// 整理されたサンプル条件データ
export const sampleConditions: TourCondition[] = [
  {
    id: 1,
    conditions: {
      courseType: "1泊2日",
      minimumParticipants: "20名様",
      tourGuide: "添乗あり",
      busType: "中型バス（電動リクライニングシート付）",
      accommodation: "相部屋（男女別室）",
      meals: "1泊3食（初日の夕食は金目鯛の煮付け）",
      applicationDeadline: "ご出発日の7日前まで",
      cancellationType: "標準（催行日の20日前から発生）",
      cancellationPolicy: [
        { daysBefore: "20日前まで", charge: "無料" },
        { daysBefore: "19〜10日前", charge: "旅行代金の20%" },
        { daysBefore: "9〜3日前", charge: "旅行代金の30%" },
        { daysBefore: "2日前", charge: "旅行代金の40%" },
        { daysBefore: "前日", charge: "旅行代金の50%" },
        { daysBefore: "当日", charge: "旅行代金の100%" }
      ]
    }
  },
  {
    id: 2,
    conditions: {
      courseType: "日帰り",
      minimumParticipants: "15名様",
      tourGuide: "添乗あり",
      busType: "大型バス（電動リクライニングシート付）",
      accommodation: "-",
      meals: "昼食付き（季節の会席料理）",
      applicationDeadline: "ご出発日の5日前まで",
      cancellationType: "短期（催行日の10日前から発生）",
      cancellationPolicy: [
        { daysBefore: "10日前まで", charge: "無料" },
        { daysBefore: "9〜3日前", charge: "旅行代金の30%" },
        { daysBefore: "2日前", charge: "旅行代金の40%" },
        { daysBefore: "前日", charge: "旅行代金の50%" },
        { daysBefore: "当日", charge: "旅行代金の100%" }
      ]
    }
  },
  {
    id: 3,
    conditions: {
      courseType: "2泊3日",
      minimumParticipants: "10名様",
      tourGuide: "添乗あり",
      busType: "中型バス（電動リクライニングシート付）",
      accommodation: "個室利用可能（追加料金あり）",
      meals: "2泊6食（地元の食材を活かした創作料理）",
      applicationDeadline: "ご出発日の10日前まで",
      cancellationType: "標準（催行日の20日前から発生）",
      cancellationPolicy: [
        { daysBefore: "20日前まで", charge: "無料" },
        { daysBefore: "19〜10日前", charge: "旅行代金の20%" },
        { daysBefore: "9〜3日前", charge: "旅行代金の30%" },
        { daysBefore: "2日前", charge: "旅行代金の40%" },
        { daysBefore: "前日", charge: "旅行代金の50%" },
        { daysBefore: "当日", charge: "旅行代金の100%" }
      ]
    }
  },
  {
    id: 4,
    conditions: {
      courseType: "1泊2日",
      minimumParticipants: "20名様",
      tourGuide: "添乗あり",
      busType: "中型バス（電動リクライニングシート付）",
      accommodation: "相部屋（男女別室）",
      meals: "1泊3食（初日の夕食は金目鯛の煮付け）",
      applicationDeadline: "ご出発日の7日前まで",
      cancellationType: "標準（催行日の20日前から発生）",
      cancellationPolicy: [
        { daysBefore: "20日前まで", charge: "無料" },
        { daysBefore: "19〜10日前", charge: "旅行代金の20%" },
        { daysBefore: "9〜3日前", charge: "旅行代金の30%" },
        { daysBefore: "2日前", charge: "旅行代金の40%" },
        { daysBefore: "前日", charge: "旅行代金の50%" },
        { daysBefore: "当日", charge: "旅行代金の100%" }
      ]
    }
  },
  {
    id: 5,
    conditions: {
      courseType: "2泊3日",
      minimumParticipants: "10名様",
      tourGuide: "添乗あり",
      busType: "中型バス（電動リクライニングシート付）",
      accommodation: "個室利用可能（追加料金あり）",
      meals: "2泊6食（地元の食材を活かした創作料理）",
      applicationDeadline: "ご出発日の10日前まで",
      cancellationType: "標準（催行日の20日前から発生）",
      cancellationPolicy: [
        { daysBefore: "20日前まで", charge: "無料" },
        { daysBefore: "19〜10日前", charge: "旅行代金の20%" },
        { daysBefore: "9〜3日前", charge: "旅行代金の30%" },
        { daysBefore: "2日前", charge: "旅行代金の40%" },
        { daysBefore: "前日", charge: "旅行代金の50%" },
        { daysBefore: "当日", charge: "旅行代金の100%" }
      ]
    }
  },  {
    id: 6,
    conditions: {
      courseType: "2泊3日",
      minimumParticipants: "10名様",
      tourGuide: "添乗あり",
      busType: "中型バス（電動リクライニングシート付）",
      accommodation: "個室利用可能（追加料金あり）",
      meals: "2泊6食（地元の食材を活かした創作料理）",
      applicationDeadline: "ご出発日の10日前まで",
      cancellationType: "標準（催行日の20日前から発生）",
      cancellationPolicy: [
        { daysBefore: "20日前まで", charge: "無料" },
        { daysBefore: "19〜10日前", charge: "旅行代金の20%" },
        { daysBefore: "9〜3日前", charge: "旅行代金の30%" },
        { daysBefore: "2日前", charge: "旅行代金の40%" },
        { daysBefore: "前日", charge: "旅行代金の50%" },
        { daysBefore: "当日", charge: "旅行代金の100%" }
      ]
    }
  },  {
    id: 7,
    conditions: {
      courseType: "2泊3日",
      minimumParticipants: "10名様",
      tourGuide: "添乗あり",
      busType: "中型バス（電動リクライニングシート付）",
      accommodation: "個室利用可能（追加料金あり）",
      meals: "2泊6食（地元の食材を活かした創作料理）",
      applicationDeadline: "ご出発日の10日前まで",
      cancellationType: "標準（催行日の20日前から発生）",
      cancellationPolicy: [
        { daysBefore: "20日前まで", charge: "無料" },
        { daysBefore: "19〜10日前", charge: "旅行代金の20%" },
        { daysBefore: "9〜3日前", charge: "旅行代金の30%" },
        { daysBefore: "2日前", charge: "旅行代金の40%" },
        { daysBefore: "前日", charge: "旅行代金の50%" },
        { daysBefore: "当日", charge: "旅行代金の100%" }
      ]
    }
  },  {
    id: 8,
    conditions: {
      courseType: "2泊3日",
      minimumParticipants: "10名様",
      tourGuide: "添乗あり",
      busType: "中型バス（電動リクライニングシート付）",
      accommodation: "個室利用可能（追加料金あり）",
      meals: "2泊6食（地元の食材を活かした創作料理）",
      applicationDeadline: "ご出発日の10日前まで",
      cancellationType: "標準（催行日の20日前から発生）",
      cancellationPolicy: [
        { daysBefore: "20日前まで", charge: "無料" },
        { daysBefore: "19〜10日前", charge: "旅行代金の20%" },
        { daysBefore: "9〜3日前", charge: "旅行代金の30%" },
        { daysBefore: "2日前", charge: "旅行代金の40%" },
        { daysBefore: "前日", charge: "旅行代金の50%" },
        { daysBefore: "当日", charge: "旅行代金の100%" }
      ]
    }
  },
];