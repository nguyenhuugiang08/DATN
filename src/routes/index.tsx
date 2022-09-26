import Home from "../pages/Home";
import Product from "../pages/Products";
import ProductDetail from "../pages/Products/components/ProductDetail";
import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import Login from "components/Login";
import Register from "components/Register";

export const pulicRouters: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    {
        path: "product",
        element: <MainLayout />,
        children: [
            { path: "/product", element: <Product /> },
            {
                path: ":id",
                element: <ProductDetail />,
            },
        ],
    },
    {
        path: "account",
        element: <MainLayout />,
        children: [
            { path: "login", element: <Login /> },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
];

export const privateRouters: RouteObject[] = [
    {
        path: "admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin",
                element: <Home />,
            },
        ],
    },
];
