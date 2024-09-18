import { Link } from "react-router-dom";
import Linkbutton from "../../ui/Linkbutton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import Deletebtn from "./Deletebtn";
import UpdateCartItem from "./UpdateCartItem";
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const dispatch = useDispatch();
  const username = useSelector((store) => store.User.userName);
  const cart = useSelector(getCart);
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="py-5">
      <Linkbutton to="/menu">&larr; Back to menu</Linkbutton>

      <h2 className="my-8 text-xl font-bold">Your cart, {username}</h2>
      <ul className="divide-y divide-stone-400 border-b border-stone-400">
        {cart.map((item) => (
          <CartItem item={item} />
        ))}
      </ul>
      <div className="mt-9">
        <Button type="primary" to="/order/new">
          Order Pizzas
        </Button>

        <Button onClick={() => dispatch(clearCart())} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
