import { Container, Grid } from "@mui/material";
import { CartItem } from "interfaces/interface";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Cart from "./index";
import FormCart from "components/FormCart";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    line: {
        position: "relative",

        "&:before": {
            content: '""',
            position: "absolute",
            width: "1px",
            background: "#ccc",
            left: "50%",
            transform: "translateX(-50%)",
            height: "95%",
        },
    },
});

const CartAll = () => {
    const { cart } = useSelector((state: RootState) => state.cart);
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        if (cart?.length === 0) {
            navigate(-1);
        }
    }, []);

    return (
        <Container maxWidth='xl' sx={{ marginTop: "20px" }}>
            <Grid container>
                <Grid xs={6}>
                    <Grid
                        xs={12}
                        style={{ fontSize: "30px", fontWeight: 700, marginBottom: "32px" }}
                    >
                        Thông tin vận chuyển
                    </Grid>
                    <FormCart />
                </Grid>
                <Grid xs={1} className={classes.line}></Grid>
                <Grid xs={5}>
                    <Grid
                        xs={12}
                        style={{
                            fontSize: "30px",
                            fontWeight: 700,
                            marginBottom: "32px",
                        }}
                    >
                        Giỏ hàng
                    </Grid>
                    <div style={{ overflow: "auto", scrollBehavior: "smooth", height: "470px" }}>
                        {cart?.map((item: CartItem, index: number) => (
                            <Cart cart={item} key={index} />
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};
export default CartAll;
