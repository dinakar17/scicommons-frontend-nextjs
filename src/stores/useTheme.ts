import { create } from 'zustand';

type Store = {
  dark: boolean;
  setDark: () => void;
};

export const useTheme = create<Store>()((set) => ({
  dark: false,
  setDark: () => set((state) => ({ dark: !state.dark })),
}));
