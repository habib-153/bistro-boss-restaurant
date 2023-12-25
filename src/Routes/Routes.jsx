import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PrivateRoute from "./privateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/paymentHistory/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
          path:'menu',
          element:<Menu></Menu>
        },
        {
          path:'login',
          element:<Login></Login>
        },
        {
          path:'register',
          element:<Register></Register>
        },
        {
          path:'order/:category',
          element:<Order></Order>
        }
    ]
  },
  {
    path:'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        path:'userHome',
        element:<UserHome></UserHome>
      },
      {
        path:'cart',
        element:<Cart></Cart>
      },
      {
        path:'payment',
        element:<Payment></Payment>
      },
      {
        path:'paymentHistory',
        element:<PaymentHistory></PaymentHistory>
      },
      // admin----------------------------
      {
        path:'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:'manageItems',
        element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
        path:'updateItem/:id',
        element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params}) => fetch(`https://bistro-boss-server-blond-zeta.vercel.app/menu/${params.id}`)
        //     fetch("https://bistro-boss-server-blond-zeta.vercel.app/reviews")
      },
      {
        path:'addItems',
        element:<AdminRoute><AddItems></AddItems></AdminRoute>
      }
    ]
  }
]);
