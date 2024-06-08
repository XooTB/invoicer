import AdditionalStore from "../store/AdditionalStore";

export default function AdditionalForm() {
  const options = [
    { name: "Collsion Damage Waiver", price: 9 },
    { name: "Liability Insurance", price: 15 },
    { name: "Rental Tax", price: 20 },
  ];

  const { addCharge, removeCharge } = AdditionalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (checked) {
      addCharge(id);
    } else {
      removeCharge(id);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-sans mt-10">Additional Charges</h1>
      <hr className="text-violet-500 pb-9" />
      <form className="border-2 flex flex-col px-10 py-10 rounded-lg">
        {options.map((option) => (
          <div key={option.name} className="flex gap-3 items-center pb-3">
            <input
              type="checkbox"
              id={option.name}
              className="h-4 w-4"
              onChange={handleChange}
            />
            <label htmlFor={option.name}>
              {option.name} (+${option.price})
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}
