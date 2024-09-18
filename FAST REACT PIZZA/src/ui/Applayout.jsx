import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function Applayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen  ">
      {isLoading === 'loading' && <Loader/>} 


      <Header />
      <div className=" ">
      <main className="max-w-3xl mx-auto">
        <Outlet />
      </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default Applayout;
