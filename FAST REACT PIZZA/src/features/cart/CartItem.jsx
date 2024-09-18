import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import Deletebtn from "./Deletebtn";
import UpdateCartItem from "./UpdateCartItem";
import { getCart, getQuantity } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentId = useSelector(getQuantity(pizzaId))
  return (
    <li className="flex justify-between font-bold px-2 py-4">
      <p>
        {quantity}&times; {name}
        <p className="mr-5">{formatCurrency(totalPrice)}</p>
      </p>
      <div className="flex items-center gap-4">
       <UpdateCartItem currentNumber={currentId} id={pizzaId}  /> 
        <Deletebtn id={pizzaId} />
       
      </div>
    </li>
  );
}

export default CartItem;
