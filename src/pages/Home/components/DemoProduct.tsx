import React from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import CardProduct from "components/CardProduct";

const useStyles = makeStyles({
    demoProductTitle: {
        fontSize: "46px",
        fontWeight: "bold",
        marginBottom: "32px !important",
    },
});

const DemoProduct: React.FC = () => {
    const classes = useStyles();
    const { dataHome } = useSelector((state: RootState) => state.others);

    return (
        <div>
            <Container maxWidth='xl'>
                <Grid item xs={12} className={classes.demoProductTitle}>
                    Mẫu áo nam
                </Grid>
                <Grid container>
                    <CardProduct
                        products={dataHome.shirtProducts}
                        spacing={3}
                        totalColumn={2}
                        columns={10}
                    />
                </Grid>
            </Container>
        </div>
    );
};
export default DemoProduct;
