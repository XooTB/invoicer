import { create } from "zustand";

type NameStore = {
  name: string;
  email: string;
  phone: string;
  setVal: (key: string, value: string) => void;
};

const NameStore = create<NameStore>((set) => ({
  name: "",
  email: "",
  phone: "",
  setVal: (key, value) => set((state) => ({ [key]: value })),
}));

export default NameStore;
