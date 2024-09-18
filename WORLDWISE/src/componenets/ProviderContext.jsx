/* eslint-disable react/prop-types */
import {createContext,useCallback,useContext,useEffect,useReducer} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";
const initialState = {
  cities: [],
  isLoading: true,
  currentCity: {},
  status: "successful",
};

export function ProviderContext({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentCity, setCurrentCity] = useState({});
  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true };
      case 'cities/loaded':
        return {...state, isLoading: false, cities: action.payload }
      case "city/loaded":
        return { ...state, currentCity: action.payload, isLoading: false };
      case "city/delete":
        return {
          ...state,
          cities: state.cities.filter((citi) => citi.id !== action.payload),
          isLoading: false,
        };
      case "city/create":
        return {
          ...state,
          cities: [...state.cities, action.payload],
          isLoading: false,
        };
      case "error":
        return { ...state };
      default:
        throw new Error("No function found for type of action");
    }
  }

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getId = useCallback( async function getId(id) {
    if (+id == currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error" });
    }
  }, [currentCity.id])

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: id });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error" });
    }
  }

  async function submitCity(newCity) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "city/create", payload: newCity });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error" });
    }
  }

  useEffect(function () {
    dispatch({ type: "loading" });
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({type:'cities/loaded', payload: data})
      } catch (err) {
        console.error(err);
        dispatch({type:'error'})
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, getId, currentCity, submitCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("State used Outside Context");
  return context;
}
