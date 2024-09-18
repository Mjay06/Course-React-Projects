import CreateCustomer from "./Features/customers/CreateCustomer";
import Customer from "./Features/customers/Customer";
import AccountOperations from "./Features/accounts/AccountOperations";
import BalanceDisplay from "./Features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const fullname = useSelector((store) => store.Customer.name);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>

      {fullname === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
