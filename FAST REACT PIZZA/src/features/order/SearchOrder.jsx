import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search order#"
        className="rounded-full px-4 py-2 bg-yellow-100 placeholder:text-stone-400 w-28 sm:w-64 sm:focus:w-72
         transition-all duration-3 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-yellow-300 "
      />
    </form>
  );
}

export default SearchOrder;
