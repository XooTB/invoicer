import Head from "./components/Head";
import ReservationForm from "./components/ReservationForm";
import VehicleForm from "./components/VehicleForm";
import CustomerForm from "./components/CustomerForm";
import AdditionalForm from "./components/AdditionalForm";
import useGetCars from "./hooks/useGetCars";
import TotalSummary from "./components/TotalSummary";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";

function App() {
  const { getCars } = useGetCars();
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div>
      {toggle && <Modal toggle={toggle} setToggle={setToggle} />}
      <Head setToggle={setToggle} toggle={toggle} />
      <div className="flex gap-10 px-10">
        <div className="w-1/3 flex flex-col">
          <ReservationForm />
          <VehicleForm />
        </div>
        <div className="w-1/3 flex flex-col">
          <CustomerForm />
          <AdditionalForm />
        </div>
        <div className="w-1/3">
          <TotalSummary />
        </div>
      </div>
    </div>
  );
}

export default App;
