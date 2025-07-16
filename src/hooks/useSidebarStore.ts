import { create } from "zustand";

interface SidebarState {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: true,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));

export const useSidebarCollapsed = () =>
  useSidebarStore((state) => state.isCollapsed);

export const useSidebarToggle = () =>
  useSidebarStore((state) => state.toggleCollapse);
