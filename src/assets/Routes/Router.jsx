import { createBrowserRouter } from "react-router";
import RouteLayout from "../Layouts/RootLayout";
import Home from "../Components/Home";
import Coverage from "../Pages/Coverage";
import Services from "../Pages/Services";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider";
import SendParcel from "../Pages/SendParcel";
import AboutUs from "../Pages/AboutUs";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../Pages/DasBoard/MyParcels";
import Payment from "../Pages/DasBoard/Payment";
import PaymentSyccess from "../Pages/DasBoard/PaymentSyccess";
import PaymentCancel from "../Pages/DasBoard/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout></RouteLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("/servicesZone.json").then((res) => res.json()),
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "/send-parcel",
        loader: () => fetch("/servicesZone.json").then((res) => res.json()),
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dasboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: <MyParcels></MyParcels>,
      },

      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "payment-success",
        element: <PaymentSyccess></PaymentSyccess>,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
    ],
  },
]);
