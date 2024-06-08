import VehicleStore from "../store/VehicleStore";
import useCarsStore from "../store/CarsStore";

export default function VehicleForm() {
  const { setVal, model, type } = VehicleStore();
  const { cars } = useCarsStore();
  // console.log({ type, model });

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "type" && model) {
      setVal("model", "");
    }
    setVal(e.target.name, e.target.value);
  };

  const typeOptions = cars
    .map((car) => car.type)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="my-10 h-[200px]">
      <h1 className="text-3xl font-sans">Vehicle Information</h1>
      <hr className="text-violet-500 pb-5 pt-4" />
      <form className="border-2 flex flex-col px-10 py-20 rounded-lg">
        <label className="text-xl pb-5 req">Vehicle Type</label>
        <select
          onChange={onChange}
          className="border px-3 py-2 rounded-md"
          name="type"
        >
          <option value="" disabled selected>
            Select a Type
          </option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label className="text-xl pb-5 pt-10 req">Vehicle</label>
        <select
          onChange={onChange}
          className="border px-3 py-2 rounded-md"
          name="model"
          value={model ? model : ""}
        >
          <option value="" disabled>
            Select a Vehicle
          </option>
          {cars
            .filter((car) => car.type === type)
            .map((car) => (
              <option key={car.model} value={car.model}>
                {car.model}
              </option>
            ))}
        </select>
        <div className="mt-10">
          <h2 className="text-2xl font-medium font-sans mb-3">
            Selected Vehicle
          </h2>
          {model ? (
            <div>
              {cars
                .filter((car) => car.model === model)
                .map((car) => (
                  <div key={car.model}>
                    <img
                      src={car.imageURL}
                      alt={car.model}
                      className="h-40 object-cover rounded-lg"
                    />
                    <h3 className="text-xl font-sans">
                      {car.make} {car.model} {car.year}
                    </h3>
                    <hr className="py-5" />
                    <p className="text-xl font-medium">Rates:</p>
                    <p className="text-lg font-sans">
                      Hourly: {car.rates.hourly}$
                    </p>
                    <p className="text-lg font-sans">
                      Daily: {car.rates.daily}$
                    </p>
                    <p className="text-lg font-sans">
                      Weekly: {car.rates.weekly}$
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-lg font-sans">No vehicle selected</p>
          )}
        </div>
      </form>
    </div>
  );
}
