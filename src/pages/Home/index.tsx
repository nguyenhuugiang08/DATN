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
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "24px 0",
                }}
            >
                <div
                    style={{
                        fontWeight: 700,
                        color: "#000",
                        fontSize: "2.25rem",
                        marginBottom: "1.25rem",
                    }}
                >
                    Bạn tìm gì hôm nay?
                </div>
                <input
                    type='text'
                    style={{
                        backgroundColor: "#d4d4d466",
                        border: 0,
                        height: "3rem",
                        borderRadius: "100vmax",
                        paddingLeft: "1.5rem",
                        paddingRight: "1.5rem",
                        fontSize: "1rem",
                        width: "40%",
                    }}
                    placeholder='Tìm kiếm theo giá, tên'
                />
            </div>
            <DemoProduct />
            <Image />
            <TrousersProducts />
        </>
    );
};

export default Home;
