import { Container, Grid } from "@mui/material";
import { CartItem } from "interfaces/interface";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Cart from "./index";
import FormCart from "components/FormCart";

const CartAll = () => {
    const { cart } = useSelector((state: RootState) => state.cart);
    return (
        <Container maxWidth='xl' sx={{ marginTop: "20px" }}>
            <Grid container>
                <Grid xs={7} pr={4}>
                    <Grid
                        xs={12}
                        style={{ fontSize: "30px", fontWeight: 700, marginBottom: "32px" }}
                    >
                        Thông tin vận chuyển
                    </Grid>
                    <FormCart />
                </Grid>
                <Grid xs={5}>
                    <Grid
                        xs={12}
                        style={{ fontSize: "30px", fontWeight: 700, marginBottom: "32px" }}
                    >
                        Giỏ hàng
                    </Grid>
                    {cart?.map((item: CartItem, index: number) => (
                        <Cart cart={item} key={index} />
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};
export default CartAll;
