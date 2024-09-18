import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, getQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateCartItem({ currentNumber, id }) {
    const dispatch = useDispatch()
  return (
    <div className="flex gap-2 items-center sm:gap-6">
      <Button onClick={()=> dispatch(increaseItemQuantity(id))} type="round">+</Button>
      {currentNumber}
      <Button onClick={()=> dispatch(decreaseItemQuantity(id))} type="round">-</Button>
    </div>
  );
}

export default UpdateCartItem;
