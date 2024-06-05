export interface DailyOpenClose {
  afterHours: number;
  close: number;
  from: `${string}-${string}-${string}`;
  high: number;
  low: number;
  open: number;
  preMarket: number;
  status: string;
  symbol: string;
  volume: number;
}
