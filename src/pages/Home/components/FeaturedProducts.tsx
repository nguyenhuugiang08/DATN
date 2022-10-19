import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Product } from "interfaces/interface";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const useStyles = makeStyles({
    title: {
        color: "#000",
        fontSize: "2em !important",
        lineHeight: 1.2,
        fontWeight: "600 !important",
        textTransform: "uppercase",
    },
});

const FeaturedProducts = () => {
    const classes = useStyles();
    const { dataHome } = useSelector((state: RootState) => state.others);
    
    const listTitle = dataHome.featuredProducts?.map(
        (product: { title: string; data: Product[] }) => product.title
    );

    return (
        <Container>
            <Grid sx={{ display: "flex", alignItems: "center" }}>
                <Typography className={classes.title} sx={{ mr: 1 }}>
                    giảm sốc 50%
                </Typography>
                <img
                    src='https://bizweb.dktcdn.net/100/448/042/themes/876420/assets/flashsale-hot.png?1666084718503'
                    alt='GIẢM SỐC 50%'
                    style={{
                        maxHeight: "55px",
                        width: "33px",
                        aspectRatio: "auto 33 / 15",
                        height: "15px",
                    }}
                />
            </Grid>
            <Grid container>
                {listTitle?.map((title: string, index: number) => (
                    <Grid item xs={2} key={index}>
                        {title}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FeaturedProducts;
