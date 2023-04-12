import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Color, Product } from "interfaces/interface";
import { makeStyles } from "@mui/styles";

export interface CardProductProps {
    products: Product[];
    totalColumn: any;
    spacing: any;
}

const useStyles = makeStyles({
    thumbnailProduct: {
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        paddingTop: "150%",
        borderRadius: "8px",
    },
    productTrademark: {
        fontSize: "13px !important",
        textTransform: "uppercase",
        color: "#969696",
        letterSpacing: "1.8px",
        marginTop: "10px !important",
        display: "block",
    },
    productLink: {
        textDecoration: "none",
        color: "#111",
    },
    productName: {
        fontSize: "14px",
        lineHeight: "1.2em !important",
        fontWeight: 400,
        marginBottom: "0.75rem !important",
        display: "block",
    },
    productPrices: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    productPrice: {
        color: "#242424",
        fontWeight: "700 !important",
        marginRight: "14px !important",
    },
    productPromotional: {
        color: "#c4c4c4",
        fontSize: "14px !important",
        fontWeight: "600 !important",
        display: " flex",
        alignItems: "center",
    },
    productDiscount: {
        alignItems: "center",
        color: "red",
        marginLeft: "10px !important",
        fontSize: "14px !important",
        lineHeight: "18px",
        textAlign: "left",
        fontWeight: "500 !important",
    },
    colorThumbnail: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        paddingTop: "60%",
        borderRadius: "10px",
        marginRight: "6px",
    },
});

const CardProduct: React.FC<CardProductProps> = ({ products, totalColumn, spacing }) => {
    const classes = useStyles();
    return (
        <Grid item container spacing={spacing}>
            {products?.map((product) => (
                <Grid item xs={totalColumn} key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Box
                            sx={{
                                backgroundImage: `url(${product.thumbnails?.[0].url})`,
                            }}
                            className={classes.thumbnailProduct}
                        ></Box>
                    </Link>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            margin: "12px 0",
                        }}
                    >
                        {product?.colors?.map((color: any) => (
                            <Box
                                key={color._id}
                                sx={{
                                    width: "35px",
                                }}
                            >
                                <div
                                    style={{ backgroundImage: `url(${color.thumbnail})` }}
                                    className={classes.colorThumbnail}
                                ></div>
                            </Box>
                        ))}
                    </div>
                    <Link to={`/product/${product._id}`} className={classes.productLink}>
                        <Typography className={classes.productName}>{product.name}</Typography>
                    </Link>
                    <Box className={classes.productPrices}>
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
                                -{product.discount}%
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardProduct;
