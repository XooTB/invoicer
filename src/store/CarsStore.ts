import { create } from "zustand";

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  seats: number;
  bags: number;
  features: string[];
  rates: {
    hourly: number;
    daily: number;
    weekly: number;
  };
  imageURL: string;
};

type CarVals = {
  cars: Car[];
  setCars: (cars: Car[]) => void;
  removeCars: (id: string) => void;
};

const useCarsStore = create<CarVals>((set) => ({
  cars: [],
  setCars: (cars) => set({ cars }),
  removeCars: (id) =>
    set((state) => ({
      cars: state.cars.filter((car) => car.id !== id),
    })),
}));

export default useCarsStore;
