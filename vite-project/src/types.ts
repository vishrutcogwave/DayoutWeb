export interface PackageData {
  id: number;
  image: string;
  startTime: string;
  title: string;
  timeRange: string;
  price: number;
  taxNote: string;
  featuresLeft: string[];
  featuresRight: string[];
}

export interface CountState {
  adults: number;
  children: number;
}