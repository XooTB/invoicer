import { create } from "zustand";

type CustomerStore = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  setInfo: (key: string, value: string) => void;
};

const CustomerStore = create<CustomerStore>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  setInfo: (key, value) => set(() => ({ [key]: value })),
}));

export default CustomerStore;
