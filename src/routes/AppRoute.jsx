import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SpinnerFullPage from "../components/SpinnerFullPage";
import Cities from "../components/Cities";
import Countries from "../components/Countries";
import Form from "../components/Form";
import CityDetail from "../components/CityDetail";

const Homepage = lazy(() => import("../pages/Homepage"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Product = lazy(() => import("../pages/Product"));
const Login = lazy(() => import("../pages/Login"));
const AppLayout = lazy(() => import("../layout/AppLayout"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

function AppRoute() {
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<Cities />} />
          <Route path="cities/:id" element={<CityDetail />} />
          <Route path="countries" element={<Countries />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoute;
