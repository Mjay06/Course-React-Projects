import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as OrderLoader } from "./features/order/Order";
import Cart from "./features/cart/Cart";
import Menu, { loader as MenuLoader } from "./features/menu/Menu";
import Applayout from "./ui/Applayout";
import Error from "./ui/Error";
import { action as UpdateOrderAction } from "./features/order/UpdateOrderbtn";
import { useSelector } from "react-redux";
import { getCart } from "./features/cart/cartSlice";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: MenuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        errorElement: <Error />,
        loader: OrderLoader,
        element: <Order />,
        action: UpdateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
