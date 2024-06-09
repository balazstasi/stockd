import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const useUIState = create(
  persist<UIState>(
    (set, get) => ({
      viewMode: 'grid',
      setViewMode: (mode: 'grid' | 'list') => {
        set({ viewMode: mode });
      },
    }),
    {
      name: 'stocked-ui-state',
    }
  )
);
