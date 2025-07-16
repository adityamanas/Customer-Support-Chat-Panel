import { create } from "zustand";

interface SidebarState {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: true,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
