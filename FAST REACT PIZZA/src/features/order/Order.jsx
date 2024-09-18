// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";
import { useEffect } from "react";
import UpdateOrderbtn from "./UpdateOrderbtn";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const fetcher = useFetcher();
 
  useEffect(()=>{
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')
  }, [fetcher])

  
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="p-6">
      <div className="flex h-[80px] flex-wrap items-center justify-between">
        <h2 className="text-xl font-bold">Order #{id} status</h2>

        <div>
          {priority && (
            <span className="mr-4 rounded-full bg-red-500 px-4 py-2 font-semibold uppercase tracking-wide text-red-100">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-4 py-2 font-semibold uppercase tracking-wide text-green-100">
            {status} order
          </span>
        </div>
      </div>

      <div className="my-8 flex flex-wrap items-center justify-between bg-stone-300 p-6">
        <p className="text-sm font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs tracking-wide">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="dive-stone-900 my-6 divide-y-2 divide-stone-300 border-b border-t border-stone-300">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={fetcher?.data?.find(el => el.id === item.pizzaId)?.ingredients ?? []}
            isLoadingState={fetcher.state === 'loading'}
            
          />
        ))}
      </ul>
      <div className="bg-stone-300 p-6 text-sm ">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-base font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrderbtn order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);

  return order;
}

export default Order;
