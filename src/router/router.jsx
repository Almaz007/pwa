import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Oscilogramms from "../pages/oscilogramms/Oscilogramms";
import Terminal from "../pages/terminal/Terminal";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Terminal />,
            },
            {
                path: "oscilogramms",
                element: <Oscilogramms />,
            },
        ],
    },
]);
