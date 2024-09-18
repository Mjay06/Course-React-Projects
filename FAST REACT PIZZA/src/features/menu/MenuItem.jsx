import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem, getQuantity } from "../cart/cartSlice";
import Deletebtn from "../cart/Deletebtn"
import UpdateCartItem from "../cart/UpdateCartItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const Quantity = useSelector(getQuantity(id))
  console.log(Quantity)
  const isThere = Quantity > 0
  const dispatch = useDispatch()
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem))
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24  ${soldOut ? `opacity-70 grayscale` : ``}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-1.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p className="font-semibold text-stone-900">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="font-medium uppercase text-stone-500">Sold out</p>
          )}
          {!soldOut && !isThere && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
          {isThere && 
          <div className="flex items-center gap-4">
          <UpdateCartItem id={id} currentNumber={Quantity} />
          <Deletebtn id={id} />
          </div>
          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
