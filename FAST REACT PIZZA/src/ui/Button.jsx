import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "duration-3 rounded-full bg-yellow-400 font-semibold uppercase transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed  sm-4";
  const style = {
    primary: base + " sm:px-6 sm:py-4 px-4 py-3 ",
    small: base + "sm:px-6 sm:py-2 px-4 py-3 text-sm",
    round:  base + "sm:px-1 sm:py-2 px-3.5 py-2.5 text-sm",
    secondary:
      "sm:px-6 sm:py-4 px-4 py-3 duration-3 text-stone-400 rounded-full border ml-2 border-stone-400 font-semibold uppercase transition-colors hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed  sm-4",
  };
  if (to) {
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (onClick)
    return (
      <button  onClick={onClick} className={style[type]} disabled={disabled}>
        {children}
      </button>
    );
  return (
    <button className={style[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
