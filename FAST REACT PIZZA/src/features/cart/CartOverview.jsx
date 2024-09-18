import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";


function CartOverview() {
  const totalCartPizza = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice)
  if(totalCartPizza === 0 ) return null
  return (
    <div className=" item-center flex justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 sm:px-4 sm:py-4 sm:text-base ">
      <p className="space-x-4 font-semibold uppercase text-stone-300 sm:space-x-6">
        <span>{totalCartPizza} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link className="uppercase" to="/cart">
        {" "}
        Open cart &rarr;{" "}
      </Link>
    </div>
  );
}

export default CartOverview;
