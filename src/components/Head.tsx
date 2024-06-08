import ReservationStore from "../store/ReservationStore";
import CustomerStore from "../store/CustomerStore";
import VehicleStore from "../store/VehicleStore";

type HeadProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
};

export default function Head({ setToggle, toggle }: HeadProps) {
  const { type, model } = VehicleStore();
  const { id, pickupDate, returnDate, duration } = ReservationStore();
  const { firstName, lastName, email, phone } = CustomerStore();

  const handleSubmit = () => {
    if (
      !type ||
      !model ||
      !id ||
      !pickupDate ||
      !returnDate ||
      !duration ||
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      alert("Please fill all the required fields");
    } else {
      setToggle(!toggle);
    }
  };
  ``;
  return (
    <div className="w-full flex justify-between px-20 py-10 ">
      <p className="text-3xl font-semibold font-sans">Reservation</p>
      <button
        className="px-20 py-5 rounded-lg font-sans font-medium bg-indigo-600 text-white text-xl"
        onClick={handleSubmit}
      >
        Print/Download
      </button>
    </div>
  );
}
