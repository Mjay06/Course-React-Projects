import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Pagenotfound from "./pages/Pagenotfound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Pagenotfound = lazy(() => import("./pages/Pagenotfound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

import CityList from "./componenets/CityList";
import CountryList from "./componenets/CountryList";
import City from "./componenets/City";
import Form from "./componenets/Form";
import { ProviderContext } from "./componenets/ProviderContext";
import { UserAuthContext } from "./componenets/userAuthContext";
import ProtectedRoute from "./componenets/ProtectedRoute";
import SpinnerFullPage from "./componenets/SpinnerFullPage"

function App() {
  return (
    <UserAuthContext>
      <ProviderContext>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="*" element={<Pagenotfound />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  {" "}
                  <AppLayout />{" "}
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </ProviderContext>
    </UserAuthContext>
  );
}

export default App;
