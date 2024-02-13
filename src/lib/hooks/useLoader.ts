import { create } from "zustand";

interface LoaderState {
  isLoading: boolean;
  showLoader: (isLoading: boolean) => void;
}

export const useLoader = create<LoaderState>((set) => ({
  isLoading: false,
  showLoader: (isLoading: boolean) => set(() => ({ isLoading })),
}));
