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
                        <div className={classes.cart}>
                            <ShoppingBagOutlinedIcon />
                            <span className={classes.cartNumber}>{cart?.length}</span>
                        </div>
                    </div>
                </Grid>
            </Container>
        </>
    );
}

export default Header;
