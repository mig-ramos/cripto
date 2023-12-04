import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Datail } from "./pages/detail";
import { Notfound } from "./pages/notfound";

const router = createBrowserRouter([
    {
        children:[
           {
            path: "/",
            element: <Home/>
           } 
        ]
    }
])

export { router };