import React from "react";
import { Grid, Box, Typography, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "interfaces/interface";
import { makeStyles } from "@mui/styles";

export interface CardProductProps {
    products: Product[];
}

const useStyles = makeStyles({
    thumbnailProduct: {
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        paddingTop: "150%",
    },
    productTrademark: {
        fontSize: "13px !important",
        textTransform: "uppercase",
        color: "#969696",
        letterSpacing: "1.8px",
        marginTop: "10px !important",
        display: "block",
    },
    productName: {
        textDecoration: "none",
        color: "#000",
        fontSize: "16px",
        lineHeight: "1.4",
        fontWeight: "bold",
    },
    productPrice: {
        color: "#df0000",
        fontWeight: "600 !important",
        lineHeight: "24px",
        textAlign: "left",
    },
    productPromotional: {
        color: "#666666",
        fontSize: "14px !important",
        display: " flex",
        alignItems: "center",
    },
    productDiscount: {
        alignItems: "center",
        color: "#ffffff",
        fontSize: "12px !important",
        lineHeight: "18px",
        textAlign: "left",
        backgroundColor: "#d84144",
        borderRadius: "9999px",
        fontWeight: 500,
        padding: "2px 5px",
        width: "max-content",
        marginLeft: "5px !important",
    },
});

const CardProduct: React.FC<CardProductProps> = ({ products }) => {
    const classes = useStyles();
    return (
        <Grid item container columns={10} spacing={2}>
            {products?.map((product) => (
                <Grid item xs={2} key={product._id}>
                    <Link to='/'>
                        <Box
                            sx={{
                                backgroundImage: `url(${product.thumbnails?.[0].url})`,
                            }}
                            className={classes.thumbnailProduct}
                        ></Box>
                    </Link>
                    <Typography
                        className={classes.productTrademark}
                        component={"span"}
                        variant={"body2"}
                    >
                        {product.trademark}
                    </Typography>
                    <Link to='/' className={classes.productName}>
                        <Typography>{product.name}</Typography>
                    </Link>
                    <Typography
                        className={classes.productPrice}
                        component={"span"}
                        variant={"body2"}
                    >
                        {product.price.toLocaleString()}
                        <u>đ</u>
                    </Typography>
                    <Typography
                        className={classes.productPromotional}
                        component={"span"}
                        variant={"body2"}
                    >
                        <del>
                            {(
                                (Number(product.price) * Number(product.discount)) /
                                100
                            ).toLocaleString()}
                            đ
                        </del>
                        <Typography
                            className={classes.productDiscount}
                            component={"span"}
                            variant={"body2"}
                        >
                            {product.discount}%
                        </Typography>
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardProduct;
