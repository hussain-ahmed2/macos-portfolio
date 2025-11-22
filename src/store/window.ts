import { INITIAL_Z_INDEX, WINDOW_CONFIG, type WindowKey, type Windows } from "@/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type WindowState = {
	windows: Windows;
	nextZIndex: number;
	openWindow: <T>(windowKey: WindowKey, data?: T) => void;
	closeWindow: (windowKey: WindowKey) => void;
	focusWindow: (windowKey: WindowKey) => void;
};

const useWindowStore = create<WindowState>()(
	immer((set) => ({
		windows: WINDOW_CONFIG,
		nextZIndex: INITIAL_Z_INDEX + 1,
		openWindow: <T>(windowKey: WindowKey, data: T) =>
			set((state) => {
				const window = state.windows[windowKey];
				window.isOpen = true;
				window.zIndex = state.nextZIndex;
				window.data = data ?? window.data;
				state.nextZIndex++;
			}),
		closeWindow: (windowKey: WindowKey) =>
			set((state) => {
				const window = state.windows[windowKey];
				window.isOpen = false;
				window.zIndex = INITIAL_Z_INDEX;
				window.data = null;
			}),
		focusWindow: (windowKey: WindowKey) =>
			set((state) => {
				const window = state.windows[windowKey];
				window.zIndex = state.nextZIndex++;
			}),
	}))
);

export default useWindowStore;
