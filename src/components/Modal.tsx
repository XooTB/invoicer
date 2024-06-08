import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./Invoice";
import ReservationStore from "../store/ReservationStore";
import CustomerStore from "../store/CustomerStore";
import VehicleStore from "../store/VehicleStore";
import useCarsStore from "../store/CarsStore";
import AdditionalStore from "../store/AdditionalStore";

type ModalProps = {
  toggle: true;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

function splitTime(hours: number) {
  // Split the hours into weeks, days, and hours

  const weeks = Math.floor(hours / 168);
  const days = Math.floor((hours % 168) / 24);
  const hoursLeft = hours % 24;

  return { weeks, days, hours: hoursLeft };
}

export default function Modal({ setToggle, toggle }: ModalProps) {
  //   const [instance, update] = usePDF({ document: <MyDocument /> });

  const handleClick = () => {
    setToggle(!toggle);
  };

  const { type, model } = VehicleStore();
  const { id, pickupDate, returnDate, duration } = ReservationStore();
  const { firstName, lastName, email, phone } = CustomerStore();
  const { additionalCharges } = AdditionalStore();
  const { cars } = useCarsStore();

  const timeLog = splitTime(duration);

  const extras = [
    { name: "Collsion Damage Waiver", price: 9 },
    { name: "Liability Insurance", price: 15 },
    { name: "Rental Tax", price: 20 },
  ].filter((charge) => additionalCharges.includes(charge.name));

  function calculateTotal() {
    let total = 0;
    const carInfo = cars.find((car) => car.model === model);
    if (carInfo) {
      total += carInfo.rates.weekly * timeLog.weeks;
      total += carInfo.rates.daily * timeLog.days;
      total += carInfo.rates.hourly * timeLog.hours;
      total += extras.reduce((acc, charge) => acc + charge.price, 0);
    }
    return total;
  }

  return (
    <div className={`h-full w-full bg-blue-300 rounded-xl absolute`}>
      <button
        onClick={handleClick}
        className="bg-slate-600 px-5 py-3 mt-3 ml-2 rounded-xl text-white"
      >
        Close
      </button>
      <div className="flex justify-center items-center">
        <PDFViewer width={1000} height={600}>
          <MyDocument
            type={type}
            model={model}
            id={id}
            pickupDate={pickupDate}
            returnDate={returnDate}
            duration={duration}
            firstName={firstName}
            lastName={lastName}
            email={email}
            phone={phone}
            total={calculateTotal()}
          />
        </PDFViewer>
      </div>
    </div>
  );
}
