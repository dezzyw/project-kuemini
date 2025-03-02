
import { createBrowserRouter} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import About from "../pages/about-us/Utama";


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
          path:"/tentangkami",
          element:<About/>
        }
      ]
    },
  ]);

  export default router;