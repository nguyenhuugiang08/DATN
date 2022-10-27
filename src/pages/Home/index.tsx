import { useEffect } from "react";
import { getHome } from "redux/othersSlice";
import { useAppDispatch } from "redux/store";
import Banner from "./components/Banner";
import CollectionProduct from "./components/CollectionProduct";
import Collections from "./components/Collections";
import FeaturedProducts from "./components/FeaturedProducts";
import News from "./components/News";
import Policies from "./components/Policies";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getHome());
    }, [dispatch]);

    return (
        <>
            <Banner />
            <Policies/>
            <Collections/>
            <FeaturedProducts/>
            <CollectionProduct/>
            <News/>
        </>
    );
};

export default Home;
