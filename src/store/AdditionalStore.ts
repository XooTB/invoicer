import { create } from "zustand";

type AdditionalVals = {
  additionalCharges: string[];
  addCharge: (info: string) => void;
  removeCharge: (info: string) => void;
};

const AdditionalStore = create<AdditionalVals>((set) => ({
  additionalCharges: [],
  addCharge: (info) =>
    set((state) => ({ additionalCharges: [...state.additionalCharges, info] })),
  removeCharge: (info) =>
    set((state) => ({
      additionalCharges: state.additionalCharges.filter(
        (charge) => charge !== info
      ),
    })),
}));

export default AdditionalStore;
