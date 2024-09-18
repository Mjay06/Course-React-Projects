import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";


function Home() {
  const userName = useSelector(store => store.User.userName)
  return (
    <div className="text-center mx-10 my-10">
      <h1 className="text-center text-xl font-semibold text-stone-800 mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.
        </span>
      </h1>
      
      {userName === "" ? <CreateUser /> : <Button to='/menu' type='primary'> {userName} go Back to the Menu, and order more baby 😎🤩 </Button>}
    </div>
  );
}

export default Home;
