import { create } from "zustand";
import { ReservationVals } from "../components/ReservationForm";

type ReservationStore = {
  id: string;
  pickupDate: string;
  returnDate: string;
  duration: number;
  discount: string;
  setvals: (vals: ReservationVals) => void;
  setVal: (key: string, value: string) => void;
};

const ReservationStore = create<ReservationStore>((set) => ({
  id: "",
  pickupDate: "",
  returnDate: "",
  duration: 0,
  discount: "",
  setvals: (vals) => set(vals),
  setVal: (key, value) => set({ [key]: value }),
}));

export default ReservationStore;
