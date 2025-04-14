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
  
  // サンプルカレンダーデータ
  export const sampleCalendarData: TourCalendarData[] = [
    {
      tourId: 1,
      dates: [
        {
          date: '2025-06-14',
          price: 12980,
          available: true,
          remainingSeats: 8,
          status: 'available'
        },
        {
          date: '2025-06-25',
          price: 12980,
          available: true,
          remainingSeats: 3,
          status: 'few'
        },
        {
          date: '2025-07-05',
          price: 13980,
          available: true,
          remainingSeats: 10,
          status: 'available'
        },
        {
          date: '2025-07-12',
          price: 13980,
          available: false,
          remainingSeats: 0,
          status: 'soldout'
        },
        {
          date: '2025-07-20',
          price: 15980,
          available: true,
          remainingSeats: 5,
          status: 'available'
        }
      ]
    },
    {
      tourId: 2,
      dates: [
        {
          date: '2025-06-10',
          price: 9800,
          available: true,
          remainingSeats: 12,
          status: 'available'
        },
        {
          date: '2025-06-18',
          price: 9800,
          available: true,
          remainingSeats: 2,
          status: 'few'
        },
        {
          date: '2025-06-28',
          price: 10800,
          available: false,
          remainingSeats: 0,
          status: 'closed'
        }
      ]
    },
    {
      tourId: 3,
      dates: [
        {
          date: '2025-06-14',
          price: 12980,
          available: true,
          remainingSeats: 8,
          status: 'available'
        },
        {
          date: '2025-06-25',
          price: 12980,
          available: true,
          remainingSeats: 3,
          status: 'few'
        },
        {
          date: '2025-07-05',
          price: 13980,
          available: true,
          remainingSeats: 10,
          status: 'available'
        },
        {
          date: '2025-07-12',
          price: 13980,
          available: false,
          remainingSeats: 0,
          status: 'soldout'
        },
        {
          date: '2025-07-20',
          price: 15980,
          available: true,
          remainingSeats: 5,
          status: 'available'
        }
      ]
    },
    {
      tourId: 4,
      dates: [
        {
          date: '2025-06-14',
          price: 12980,
          available: true,
          remainingSeats: 8,
          status: 'available'
        },
        {
          date: '2025-06-25',
          price: 12980,
          available: true,
          remainingSeats: 3,
          status: 'few'
        },
        {
          date: '2025-07-05',
          price: 13980,
          available: true,
          remainingSeats: 10,
          status: 'available'
        },
        {
          date: '2025-07-12',
          price: 13980,
          available: false,
          remainingSeats: 0,
          status: 'soldout'
        },
        {
          date: '2025-07-20',
          price: 15980,
          available: true,
          remainingSeats: 5,
          status: 'available'
        }
      ]
    },    {
      tourId: 5,
      dates: [
        {
          date: '2025-06-14',
          price: 12980,
          available: true,
          remainingSeats: 8,
          status: 'available'
        },
        {
          date: '2025-06-25',
          price: 12980,
          available: true,
          remainingSeats: 3,
          status: 'few'
        },
        {
          date: '2025-07-05',
          price: 13980,
          available: true,
          remainingSeats: 10,
          status: 'available'
        },
        {
          date: '2025-07-12',
          price: 13980,
          available: false,
          remainingSeats: 0,
          status: 'soldout'
        },
        {
          date: '2025-07-20',
          price: 15980,
          available: true,
          remainingSeats: 5,
          status: 'available'
        }
      ]
    },    {
      tourId: 6,
      dates: [
        {
          date: '2025-06-14',
          price: 12980,
          available: true,
          remainingSeats: 8,
          status: 'available'
        },
        {
          date: '2025-06-25',
          price: 12980,
          available: true,
          remainingSeats: 3,
          status: 'few'
        },
        {
          date: '2025-07-05',
          price: 13980,
          available: true,
          remainingSeats: 10,
          status: 'available'
        },
        {
          date: '2025-07-12',
          price: 13980,
          available: false,
          remainingSeats: 0,
          status: 'soldout'
        },
        {
          date: '2025-07-20',
          price: 15980,
          available: true,
          remainingSeats: 5,
          status: 'available'
        }
      ]
    },    {
      tourId: 7,
      dates: [
        {
          date: '2025-06-14',
          price: 12980,
          available: true,
          remainingSeats: 8,
          status: 'available'
        },
        {
          date: '2025-06-25',
          price: 12980,
          available: true,
          remainingSeats: 3,
          status: 'few'
        },
        {
          date: '2025-07-05',
          price: 13980,
          available: true,
          remainingSeats: 10,
          status: 'available'
        },
        {
          date: '2025-07-12',
          price: 13980,
          available: false,
          remainingSeats: 0,
          status: 'soldout'
        },
        {
          date: '2025-07-20',
          price: 15980,
          available: true,
          remainingSeats: 5,
          status: 'available'
        }
      ]
    },    {
      tourId: 8,
      dates: [
        {
          date: '2025-06-14',
          price: 12980,
          available: true,
          remainingSeats: 8,
          status: 'available'
        },
        {
          date: '2025-06-25',
          price: 12980,
          available: true,
          remainingSeats: 3,
          status: 'few'
        },
        {
          date: '2025-07-05',
          price: 13980,
          available: true,
          remainingSeats: 10,
          status: 'available'
        },
        {
          date: '2025-07-12',
          price: 13980,
          available: false,
          remainingSeats: 0,
          status: 'soldout'
        },
        {
          date: '2025-07-20',
          price: 15980,
          available: true,
          remainingSeats: 5,
          status: 'available'
        }
      ]
    },
  ];
  
  // 指定したツアーIDのカレンダーデータを取得する関数
  export const getTourCalendarData = (tourId: number): TourCalendarData | undefined => {
    return sampleCalendarData.find(data => data.tourId === tourId);
  };
  
  // 指定した年月のカレンダーデータを生成する関数（将来的にはAPIからデータを取得する想定）
  export const getMonthlyCalendarData = (tourId: number, year: number, month: number) => {
    const tourData = getTourCalendarData(tourId);
    
    if (!tourData) return null;
    
    // 指定した年月のデータのみをフィルタリング
    const filterDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.getFullYear() === year && date.getMonth() + 1 === month;
    };
    
    return {
      tourId,
      dates: tourData.dates.filter(item => filterDate(item.date))
    };
  };