import { create, type StateCreator } from "zustand";

export type AppPage =
  | "playMode"
  | "training"
  | "playerVsMachine"
  | "playerVsPlayer"
  | "ranking";

type AppSessionState = {
  page: AppPage;
};

const defaultState: AppSessionState = {
  page: "playMode",
};

type AppSessionSlice = AppSessionState & {
  setPageLocation: (page: AppPage) => void;
};

export const sessionCreator: StateCreator<AppSessionSlice> = (set) => ({
  ...defaultState,
  setPageLocation: (page) => set((state) => ({ ...state, page })),
});

export const useSessionStore = create<AppSessionSlice>(sessionCreator);

