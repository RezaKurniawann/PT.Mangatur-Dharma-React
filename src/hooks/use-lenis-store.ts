import { create } from "zustand";

interface LenisStore {
  smoothScroll: boolean;
  setSmoothScroll: (value: boolean) => void;
}

export const useLenisStore = create<LenisStore>((set) => ({
  smoothScroll: true,
  setSmoothScroll: (value) => set({ smoothScroll: value }),
}));
