import { locations, type Location } from "@/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type LocationState = {
	activeLocation: Location;

	setActiveLocation: (location: Location) => void;
};

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create<LocationState>()(
	immer((set) => ({
		activeLocation: DEFAULT_LOCATION,

		setActiveLocation: (location: Location) =>
			set((state) => {
				if (location === undefined) return;
				state.activeLocation = location;
			}),

		resetActiveLocation: () =>
			set((state) => {
				state.activeLocation = DEFAULT_LOCATION;
			}),
	}))
);

export default useLocationStore;
