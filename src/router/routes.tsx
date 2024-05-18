import {createBrowserRouter} from "react-router-dom";
import MainPage from "../pages/MainPage";
import MenuPage from "../pages/MenuPage";
import LowPop from "../pages/LowPop";

export const routes = createBrowserRouter([
    {
        path: "/mobile",
        element: <MainPage/>,
    },

    {
        path: "/mobile/menu",
        element: <MenuPage/>
    },
    {
        path: "/mobile/lowPop",
        element: <LowPop/>
    }
])