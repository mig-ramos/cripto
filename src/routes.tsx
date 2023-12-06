import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Datail } from "./pages/detail";
import { Notfound } from "./pages/notfound";

import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
           {
            path: "/",
            element: <Home/>
           },
           {
            path: "/detail/:cripto",
            element: <Datail/>
           },
           {
            path: "*",
            element: <Notfound/>
           }
        ]
    }
])

export { router };