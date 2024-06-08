import { create } from "zustand";

type VehicleStore = {
  type: string;
  model: string;
  addVals: (vals: VehicleStore) => void;
  setVal: (key: string, value: string) => void;
};

const VehicleStore = create<VehicleStore>((set) => ({
  type: "",
  model: "",
  addVals: (vals) => set(vals),
  setVal: (key, value) => set({ [key]: value }),
}));

export default VehicleStore;
