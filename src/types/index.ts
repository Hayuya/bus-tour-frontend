// src/types/index.ts
export type TourDetail = {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  departureDate: string;
};

export type ItineraryItem = {
  time: string;
  content: string;
};

export type TourItinerary = {
  id: number;
  schedule: ItineraryItem[];
};

export type TourCondition = {
  id: number;
  conditions: string[];
};
