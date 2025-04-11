export const sampleConditions = [
  {
    id: 1,
    conditions: {
      applicationFee: '10,000円',
      included: [
        '交通費',
        '宿泊費',
        '食事代'
      ],
      minimumParticipants: '最少催行人員20名',
      cancellationPolicy: [
        '出発日7日前〜2日前: 30%',
        '出発日前日: 50%',
        '当日: 100%'
      ]
    }
  },
  // 他のツアーも同様の構造で作成
];
