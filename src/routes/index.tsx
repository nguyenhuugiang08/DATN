import Home from "../pages/Home";
import Product from "../pages/Products";
import ProductDetail from "../pages/Products/components/ProductDetail";
import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

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
