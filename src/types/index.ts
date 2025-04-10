export interface TourPlan {
    id: string;
    title: string;
    stayDuration: string;
    courseNumber: string;
    businessTripType: string;
    price: number;
    departurePlace: string;
    destination: string;
    capacity: string;
    minCapacity: string;
    meals: {
      breakfast: number;
      lunch: number;
      dinner: number;
    };
  }
  export interface CalendarDay {
    date: number;
    isCurrentMonth: boolean;
    isAvailable: boolean;
    price?: number;
  }
  
  export interface TourDetails {
    id: string;
    title: string;
    stayDuration: string;
    courseNumber: string;
    businessTripType: string;
    price: number;
    details: {
      date: string;
      capacity: string;
      transportation: string;
      busSize: string;
      cancellation: string;
      pickupService: string;
      tourType: string;
    };
  }
  export interface ItineraryDay {
    day: number;
    schedule: Array<{
      time?: string;
      place?: string;
      description: string;
      notes?: string;
    }>;
    meals: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
    };
  }
  export interface ConditionItem {
    title: string;
    content: React.ReactNode;
  }
      