import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { store } from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const cart = useSelector(getCart);
  const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { userName, status, address, position, error } = useSelector(
    (store) => store.User,
  );
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priority = withPriority ? 0.2 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priority;
  const dispatch = useDispatch();
  const isLoading = status === "loading";
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="p-6">
      <h2 className="mb-8 text-xl font-semibold"> Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="flex flex-col py-4 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            defaultValue={userName}
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="flex flex-col py-4 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow ">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-3 rounded-md bg-red-200 p-2 text-xs text-red-700">
                {" "}
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col py-4 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              required
            />
            {status === "error" && (
              <p className="mt-3 rounded-md bg-red-200 p-2 text-xs text-red-700">
                {" "}
                {error}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px]  top-10 sm:right-[5px] sm:top-[21px]">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoading}
                type="small"
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none 
            focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="ml-4 py-4 text-sm font-semibold" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div className="text-sm font-semibold">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {position.latitude && position.longitude && (
            <input
              type="hidden"
              name="position"
              value={`${position.latitude}, ${position.longitude}`}
            />
          )}
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Processing"
              : `Order now  at $${totalPrice.toFixed(2)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const FormData = await request.formData();
  const Data = Object.fromEntries(FormData);
  const errors = {};
  if (!isValidPhone(Data.phone))
    errors.phone =
      "Please provide your correct number, be like say you no want make your food reach you";

  if (Object.keys(errors).length > 0) return errors;
  console.log(Data);
  const order = {
    ...Data,
    cart: JSON.parse(Data.cart),
    priority: Data.priority === "true",
  };
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);

}

export default CreateOrder;
