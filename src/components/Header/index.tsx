import { Container, Divider, Grid, ImageListItem } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HG_RESOURCE } from "base/resource";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { makeStyles } from "@mui/styles";
import { CartItem } from "interfaces/interface";
import Cart from "components/Cart";
import { useEffect, useState } from "react";
import { logout } from "redux/authSlice";

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
        margin: "0 8px 0 16px",
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
    const { entities } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const total = cart?.reduce((result: number, cur: CartItem) => {
            return result + Number(cur.quantity);
        }, 0);
        setTotalProductInCart(total);
    }, [cart]);

    const logoutUser = () => {
        dispatch(logout());
        navigate("/account/login");
    };

    return (
        <>
            <Container maxWidth='xl' className='header-container'>
                <Grid container>
                    <ImageListItem className='header-logo'>
                        <img src='/logo1.png' srcSet={``} alt={`logo`} loading='lazy' />
                    </ImageListItem>
                    <div className='mySwiper header-link'>
                        {HG_RESOURCE.CATEGORY.map((category, index) => (
                            <Link
                                to={category.path}
                                key={index}
                                className={`header-link__item ${
                                    location?.pathname == category.path ? "header-link__active" : ""
                                }`}
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>
                    <div className='header-icon'>
                        <SearchOutlinedIcon />
                        <div className={`${classes.cart} cart-icon`}>
                            <ShoppingBagOutlinedIcon onClick={() => navigate("/cart")} />
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
                        {entities?.length ? (
                            <div
                                className='header-user'
                                style={{
                                    margin: "0 8px",
                                    fontSize: "14px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "relative",
                                }}
                            >
                                <PersonOutlineOutlinedIcon />
                                {entities[0].surname} {entities[0].name}
                                <div className='header-avatar--hover'>
                                    <Link to={"/"} className='header-avatar__link pt-2'>
                                        Tài khoản của tôi
                                    </Link>
                                    <Link to='/order-detail' className='header-avatar__link pt-2'>
                                        Đơn mua
                                    </Link>
                                    <div className='header-avatar__link pt-2' onClick={logoutUser}>
                                        Đăng xuất
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Link
                                    to={"/account/login"}
                                    style={{
                                        textDecoration: "none",
                                        color: "var(--primary-color)",
                                        marginLeft: "8px",
                                        fontSize: "14px",
                                    }}
                                >
                                    Đăng nhập
                                </Link>{" "}
                                <div
                                    style={{
                                        height: "16px",
                                        width: "1px",
                                        background: "#333",
                                        margin: "0 8px",
                                    }}
                                ></div>
                                <Link
                                    to={"/account/register"}
                                    style={{
                                        textDecoration: "none",
                                        color: "var(--primary-color)",
                                        fontSize: "14px",
                                        marginRight: "8px",
                                    }}
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        )}
                    </div>
                </Grid>
            </Container>
        </>
    );
}

export default Header;
