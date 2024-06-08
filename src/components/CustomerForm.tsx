import CustomerStore from "../store/CustomerStore";

export default function () {
  const { setInfo } = CustomerStore();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo(name, value);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-sans mt-0">Customer Information</h1>
      <hr className="text-violet-500 pb-9" />
      <form className="border-2 flex flex-col px-10 py-10 rounded-lg">
        <label className="text-xl pb-5 req">First Name</label>
        <input
          onChange={onChange}
          className="border px-3 py-2 rounded-md"
          name="firstName"
          type="text"
          required
        />

        <label className="text-xl pb-5 pt-5 req">Last Name</label>
        <input
          onChange={onChange}
          className="border px-3 py-2 rounded-md"
          name="lastName"
          type="text"
          required
        />

        <label className="text-xl pb-5 pt-5 req">Email</label>
        <input
          onChange={onChange}
          className="border px-3 py-2 rounded-md"
          name="email"
          type="email"
          required
        />

        <label className="text-xl pb-5 pt-5 req">Phone</label>
        <input
          onChange={onChange}
          className="border px-3 py-2 rounded-md"
          name="phone"
          type="phone"
          required
        />
      </form>
    </div>
  );
}
