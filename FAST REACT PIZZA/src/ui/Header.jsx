import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "./Username";
import CreateUser from '../features/user/CreateUser'

function Header() {
  return (
    <header className="flex justify-between bg-yellow-500 px-4 py-6 sm:px-6 sm:py-6">
      <Link className="uppercase tracking-widest font-semibold" to="/"> Fast React Pizza Co. </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
 