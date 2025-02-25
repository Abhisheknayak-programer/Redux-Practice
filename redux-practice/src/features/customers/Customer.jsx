import { useSelector } from "react-redux";

function Customer() {
  const customers = useSelector((store) => store.customers);
  console.log(customers);

  return <h2>👋 Welcome,{customers.fullName}</h2>;
}

export default Customer;
