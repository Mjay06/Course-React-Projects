import { formatCurrency } from "../../utilities/helpers";

function OrderItem({ item, ingredients, isLoadingState }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex items-center justify-between py-4">
        <p className="font-semibold">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold text-sm">{formatCurrency(totalPrice)}</p>
      </div>
      <p>{isLoadingState ? 'Loading...' : `${ingredients.join(", ")}`}</p>
    </li>
  );
}

export default OrderItem;
