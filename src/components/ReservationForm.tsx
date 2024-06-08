import reservationStore from "../store/ReservationStore";

export type ReservationVals = {
  id: string;
  pickupDate: string;
  returnDate: string;
  duration: number;
  discount: string;
};

function splitTime(hours: number) {
  // Split the hours into weeks, days, and hours

  const weeks = Math.floor(hours / 168);
  const days = Math.floor((hours % 168) / 24);
  const hoursLeft = hours % 24;

  return { weeks, days, hours: hoursLeft };
}

export default function ReservationForm() {
  const { setVal, pickupDate, returnDate, duration } = reservationStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "pickupDate" || name === "returnDate") {
      const pickup = new Date(pickupDate);
      const ret = new Date(returnDate);
      const diff = ret.getTime() - pickup.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));

      setVal(name, value);
      setVal("duration", hours.toString());
    }
    setVal(name, value);
  };

  const timeLog = splitTime(duration);

  // console.log({ id, pickupDate, returnDate, duration });

  return (
    <div>
      <h1 className="text-3xl font-sans">Reservation Details</h1>
      <hr className="text-violet-500 pb-5 pt-4" />

      <form className="flex flex-col w-full px-10 border-4 rounded-lg py-10">
        <label className="font-sans text-2xl pb-3 req ">Reservation ID</label>
        <input
          onChange={onChange}
          type="text"
          name="id"
          className="border rounded-md h-10 mb-5"
        />

        <label className="font-sans text-2xl pb-3 req ">Pickup date</label>
        <input
          onChange={onChange}
          className="w-full border rounded-md h-10 mb-5 px-5"
          type="datetime-local"
          placeholder="Pick Date and Time"
          name="pickupDate"
        />

        <label className="font-sans text-2xl pb-3 req">Return date</label>
        <input
          onChange={onChange}
          value={returnDate ? returnDate : pickupDate}
          aria-placeholder="Pick a date and Time"
          className="w-full border rounded-md h-10 mb-5 px-5"
          type="datetime-local"
          placeholder="Pick Date and Time"
          name="returnDate"
        />

        <div className="flex w-full justify-between items-center">
          <p>Duration</p>
          <input
            value={`${timeLog.weeks ? `${timeLog.weeks} weeks, ` : ""} ${
              timeLog.days
            } days, ${timeLog.hours} hours`}
            type="text"
            name="duration"
            readOnly
            className=" border rounded-md h-10 mb-5 px-5"
          />
        </div>
        <label className="font-sans text-2xl pb-3">Discount</label>
        <input
          type="text"
          name="discount"
          className="border rounded-md mb-5 px-5 h-24"
        />
      </form>
    </div>
  );
}
