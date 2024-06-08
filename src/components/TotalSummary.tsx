import ReservationStore from "../store/ReservationStore";
import VehicleStore from "../store/VehicleStore";
import useCarsStore from "../store/CarsStore";
import AdditionalStore from "../store/AdditionalStore";

function splitTime(hours: number) {
  // Split the hours into weeks, days, and hours

  const weeks = Math.floor(hours / 168);
  const days = Math.floor((hours % 168) / 24);
  const hoursLeft = hours % 24;

  return { weeks, days, hours: hoursLeft };
}

export default function TotalSummary() {
  const { duration } = ReservationStore();
  const { model } = VehicleStore();
  const { cars } = useCarsStore();
  const { additionalCharges } = AdditionalStore();

  const extras = [
    { name: "Collsion Damage Waiver", price: 9 },
    { name: "Liability Insurance", price: 15 },
    { name: "Rental Tax", price: 20 },
  ].filter((charge) => additionalCharges.includes(charge.name));

  const timeLog = splitTime(duration);
  const carInfo = cars.find((car) => car.model === model);

  function calculateTotal() {
    let total = 0;
    if (carInfo) {
      total += carInfo.rates.weekly * timeLog.weeks;
      total += carInfo.rates.daily * timeLog.days;
      total += carInfo.rates.hourly * timeLog.hours;
      total += extras.reduce((acc, charge) => acc + charge.price, 0);
    }
    return total;
  }

  return (
    <div className="border border-indigo-400 rounded-lg bg-indigo-400 bg-opacity-20 px-5 py-10">
      <h1 className="text-3xl font-medium pb-3">Total Summary</h1>
      <hr className="border-indigo-500" />
      <table className="table-auto text-left text-lg">
        <thead className="h-20">
          <tr className="border-b-indigo-500 border-b ">
            <th className="w-72 text-left">Charge</th>
            <th className="w-20">Unit</th>
            <th className="w-20">Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {carInfo && (
            <>
              {timeLog.weeks > 0 ? (
                <tr className="h-10">
                  <td className="text-left">Weekly</td>
                  <td>{timeLog.weeks}</td>
                  <td>${carInfo.rates.weekly}</td>
                  <td>{carInfo.rates.weekly * timeLog.weeks}</td>
                </tr>
              ) : null}
              {timeLog.days > 0 ? (
                <tr className="h-10">
                  <td className="text-left">Daily</td>
                  <td>{timeLog.days}</td>
                  <td>${carInfo.rates.daily}</td>
                  <td>{carInfo.rates.daily * timeLog.days}</td>
                </tr>
              ) : null}
              {timeLog.hours > 0 ? (
                <tr className="h-10">
                  <td className="text-left">Hourly</td>
                  <td>{timeLog.hours}</td>
                  <td>${carInfo.rates.hourly}</td>
                  <td>{carInfo.rates.hourly * timeLog.hours}</td>
                </tr>
              ) : null}
            </>
          )}
          {extras.map((charge) => (
            <tr className="h-10" key={charge.name}>
              <td className="text-left">{charge.name}</td>
              <td>1</td>
              <td>${charge.price}</td>
              <td>${charge.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between font-sans font-semibold text-xl mt-10">
        <p>Total: </p>
        <p>{`$${calculateTotal()}`}</p>
      </div>
    </div>
  );
}
