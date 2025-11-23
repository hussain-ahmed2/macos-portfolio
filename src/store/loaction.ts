import { locations, type Location } from "@/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type LocationState = {
	activeLocation: Location | null;

	setActiveLocation: (location: Location | null) => void;
};

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create<LocationState>()(
	immer((set) => ({
		activeLocation: DEFAULT_LOCATION,

		setActiveLocation: (location: Location | null = null) =>
			set((state) => {
				state.activeLocation = location;
			}),

		resetActiveLocation: () =>
			set((state) => {
				state.activeLocation = DEFAULT_LOCATION;
			}),
	}))
);

export default useLocationStore;
