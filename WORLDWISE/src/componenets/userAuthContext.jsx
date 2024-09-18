/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const FakeAuthContext = createContext();
const initialState = {
  user: null,
  userAuth: false,
};
export function UserAuthContext({ children }) {
  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, user: action.payload, userAuth: true };
      case "logout":
        return { ...state, user: null, userAuth: false };
      default:
        throw new Error("type not found");
    }
  }
  const [{ userAuth, user }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      console.log("hmm");
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <FakeAuthContext.Provider value={{ userAuth, user, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

export function useUserAuthContext() {
  const context = useContext(FakeAuthContext);
  if (context === undefined) return;
  console.log(context);
  return context;
}
