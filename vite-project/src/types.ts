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

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatFromInputDate = (dateString: string) => {
  const date = new Date(dateString);
  return formatDate(date);
};