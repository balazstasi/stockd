import { ITickerAggsGroupedDaily } from '@/src/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Aggregated {
  stats: ITickerAggsGroupedDaily;
  setStats: (stats: ITickerAggsGroupedDaily[]) => void;
}

export const useAggregated = create(
  persist<Aggregated>(
    (set, get) => ({
      stats: {
        results: [],
      },
      setStats: (stats: ITickerAggsGroupedDaily) => set({ stats: stats }),
    }),
    {
      name: 'stocked-aggregated-state',
    }
  )
);
