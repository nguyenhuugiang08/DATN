import { useEffect } from "react";
import { getHome } from "redux/othersSlice";
import { useAppDispatch } from "redux/store";
import Banner from "./components/Banner";
import Image from "./components/Image";
import DemoProduct from "./components/DemoProduct";
import TrousersProducts from "./components/TrousersProducts";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getHome());
    }, [dispatch]);

    return (
        <>
            <Banner />
            <DemoProduct />
            <Image />
            <TrousersProducts />
        </>
    );
};

export default Home;
