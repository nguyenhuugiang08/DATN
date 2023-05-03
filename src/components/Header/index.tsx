import { Container, Grid, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import "./header.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HG_RESOURCE } from "base/resource";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { makeStyles } from "@mui/styles";
import { CartItem } from "interfaces/interface";
import Cart from "components/Cart";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    cart: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px",
        borderRadius: "999px",
        background: "#f2fd5d",
        position: "relative",
        cursor: "pointer",
    },
    cartNumber: {
        position: "absolute",
        background: "var(--primary-color)",
        width: "18px",
        height: "18px",
        fontSize: "10px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "999px",
        fontWeight: "700",
        top: "4px",
        right: "0",
    },
});

function Header() {
    const { cart } = useSelector((state: RootState) => state.cart);
    const classes = useStyles();
    const [totalProductInCart, setTotalProductInCart] = useState(0);

    useEffect(() => {
        const total = cart?.reduce((result: number, cur: CartItem) => {
            return result + Number(cur.quantity);
        }, 0);
        setTotalProductInCart(total);
    }, [cart]);

    return (
        <>
            <Container maxWidth='xl' className='header-container'>
                <Grid container>
                    <ImageListItem className='header-logo'>
                        <img src='/logo1.png' srcSet={``} alt={`logo`} loading='lazy' />
                    </ImageListItem>
                    <div className='mySwiper header-link'>
                        {HG_RESOURCE.CATEGORY.map((category, index) => (
                            <Link to={category.path} key={index} className='header-link__item'>
                                {category.title}
                            </Link>
                        ))}
                    </div>
                    <div className='header-icon'>
                        <SearchOutlinedIcon />
                        <PersonOutlineOutlinedIcon />
                        <div className={`${classes.cart} cart-icon`}>
                            <ShoppingBagOutlinedIcon />
                            <span className={classes.cartNumber}>{totalProductInCart}</span>
                            {cart?.length !== 0 && (
                                <div className='cart-wrapper'>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "1rem",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                lineHeight: "21px",
                                                textAlign: "left",
                                            }}
                                        >
                                            {totalProductInCart} sản phẩm
                                        </div>
                                        <Link
                                            to='/cart'
                                            style={{
                                                color: "#2f5acf",
                                                cursor: "pointer",
                                                textDecoration: "none",
                                                fontSize: "14px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Xem tất cả
                                        </Link>
                                    </div>
                                    {cart?.map((item: CartItem, index: number) => (
                                        <Cart cart={item} key={index} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Grid>
            </Container>
        </>
    );
}

export default Header;
