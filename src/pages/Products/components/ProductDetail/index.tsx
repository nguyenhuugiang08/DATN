import { Container, Grid, Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "redux/productSlice";
import { RootState, useAppDispatch } from "redux/store";
import ProductInfo from "./components/ProductInfo";

const ProductDetail: React.FC = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { product } = useSelector((state: RootState) => state.product);
    console.log(product);

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            backgroundImage: `url(${product?.thumbnails?.[0].url})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            paddingTop: "100%",
                        }}
                    ></Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ProductInfo product={product} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
