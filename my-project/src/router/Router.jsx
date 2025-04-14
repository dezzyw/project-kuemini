
import { createBrowserRouter} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import About from "../pages/about-us/Utama";
import Signup from "../components/Signup";
import Masuk from "../components/Login";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "/src/pages/shop/CartPage.jsx"; // ✅ BENAR
import Dashboard from "../pages/dashboard/admin/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Users from"../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import CheckoutPage from"../pages/shop/CheckoutPage";
import PaymentSuccess from "../pages/payment/Success";
import PaymentUnfinished from "../pages/payment/Unfinished";
import PaymentError from "../pages/payment/Error";
import Blog from "../pages/blog/Blog";
import AddBlog from"../pages/dashboard/admin/AddBlog";
import KelolaBlog from "../pages/dashboard/admin/KelolaBlog";
import UpdateBlog from "../pages/dashboard/admin/UpdateBlog";
import BacaBlog from "../pages/blog/BacaBlog";
import Pemasukan from "../pages/dashboard/admin/Pemasukan";
import Pengaturan from "../pages/dashboard/Pengaturan";
import RiwayatPesanan from "../pages/dashboard/RiwayatPesanan";





const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
          path:"/produk",
          element:<Menu/>
        },
        {
          path:"/blog",
          element:<Blog/>
        },
        {
          path:"/cart-page",
          element:<CartPage/>
        },
        {
          path:"/checkout",
          element:<CheckoutPage/>
        },
        {
          path:"/tentangkami",
          element:<About/>
        },
        {
          path:"/update-profile",
          element:<UpdateProfile/>
        },
        {
          path:"/pengaturan",
          element:<Pengaturan/>
        },
        {
          path:"/riwayat-pesanan",
          element:<RiwayatPesanan/>
        },
  
        
      ],
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path:"/masuk",
      element:<Masuk/>
    },
    {
      
        path: "/blog/:id",
        element: <BacaBlog />
      
    },
    {
      path: "/payment/success",
      element: <PaymentSuccess />,
    },
    {
      path: "/payment/unfinished",
      element: <PaymentUnfinished />,
    },
    {
      path: "/payment/error",
      element: <PaymentError />,
    },
    {
      path: 'dashboard',
      element: <PrivateRouter>
        <DashboardLayout/>
      </PrivateRouter>,
      children: [
        {
          path: '',
          element: <Dashboard/>
        },
        {
          path: 'users',
          element: <Users/>
        },
        {
          path: 'add-menu',
          element: <AddMenu/>
        },
        {
          path: 'manage-items',
          element: <ManageItems/>
        },
        {
          path: 'add-blog',
          element: <AddBlog/>
        },
        {
          path: 'pemasukan',
          element: <Pemasukan/>
        },
        {
          path: 'kelola-blog',
          element: <KelolaBlog/>
        },
        {
          path: 'update-menu/:id',
          element: <UpdateMenu/>,
          loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)

        },
        {
          path: 'update-blog/:id',
          element: <UpdateBlog/>,
          loader: ({params}) => fetch(`http://localhost:6001/blog/${params.id}`)

        }
      ]
    }
    
  ]);

  export default router;