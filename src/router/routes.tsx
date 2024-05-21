import {createHashRouter} from "react-router-dom";
import MainPage from "../pages/MainPage";

export const routes = createHashRouter([
    {
        path: "/",
        element: <MainPage/>,
    },

    {
        path: "/menu",
        async lazy() {
            const {default: MenuPage} = await import("../pages/MenuPage");
            return {Component: MenuPage};
        }
    },
    {
        path: "/stats",
        async lazy() {
            const {default: StatsPage} = await import("../pages/StatsPage");
            return {Component: StatsPage};
        }
    },
    {
        path: "/lowPop",
        async lazy() {
            const {default: LowPop} = await import("../pages/LowPop");
            return {Component: LowPop};
        }
    },
    {
        path: "/memorySweep",
        async lazy() {
            const {default: MemorySweepPage} = await import("../pages/MemorySweepPage");
            return {Component: MemorySweepPage};
        }
    }
])