import {createBrowserRouter, createHashRouter} from "react-router-dom";
import MainPage from "../pages/MainPage";
import MenuPage from "../pages/MenuPage";
import LowPop from "../pages/LowPop";

export const routes = createHashRouter([
    {
        path: "/",
        element: <MainPage/>,
    },

    {
        path: "/menu",
        element: <MenuPage/>
    },
    {
        path: "/lowPop",
        element: <LowPop/>
    }
])