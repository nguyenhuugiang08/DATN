import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Product } from "interfaces/interface";
import { makeStyles } from "@mui/styles";
import CardProduct from "components/CardProduct";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const useStyles = makeStyles({
    heading: {
        color: "#000",
        fontSize: "2em !important",
        lineHeight: 1.2,
        fontWeight: "600 !important",
    },
    title: {
        padding: "15px 16px",
        whiteSpace: "nowrap",
        color: "#9c9c9c",
        fontSize: "18px",
        userSelect: "none",
        position: "relative",
        fontWeight: 600,

        "&:after": {
            backgroundColor: "#cd6420",
            bottom: 0,
            content: '""',
            height: "2px",
            left: 0,
            position: "absolute",
            width: 0,
            transition: "width .2s ease-in-out",
        },

        "&$selected": {
            borderRadius: 0,
            color: "#000",

            "&:after": {
                width: "100%",
            },
        },

        "&:hover": {
            cursor: "pointer",
            color: "#cd6420",
        },
    },
    containerTitle: {
        marginTop: "10px",
        border: "1px solid #eee",
        borderLeft: "none",
        borderRight: "none",
        marginBottom: "30px",
    },
    selected: {},

    seeAllBtn: {
        fontSize: "16px !important",
        margin: "16px 0 30px 0 !important",

        "&:hover": {
            color: "#fff !important",
            backgroundColor: "#cd6420 !important",
        },
    },
});

const CollectionProduct: React.FC = () => {
    const { dataHome } = useSelector((state: RootState) => state.others);
    const [isSelected, setIsSelected] = useState(0);
    const classes = useStyles();

    const listTitle = dataHome.collections?.map(
        (collection: { title: string; data: Product[] }) => collection.title
    );

    const handleChangeSelectedTitle = (index: number) => {
        setIsSelected(index);
    };

    return (
        <Container>
            <Grid xs={12} sx={{ textAlign: "center" }}>
                <Typography component={"span"} variant={"body2"} className={classes.heading}>
                    Bộ sưu tập xuân hè
                </Typography>
            </Grid>
            <Grid2
                container
                columns={10}
                spacing={2}
                xsOffset={2}
                sx={{ marginBottom: "30px", marginTop: "16px" }}
            >
                {listTitle?.map((title: string, index: number) => (
                    <Grid
                        item
                        xs={2}
                        key={index}
                        className={`${classes.title} ${index === isSelected && classes.selected}`}
                        onClick={() => handleChangeSelectedTitle(index)}
                    >
                        {title}
                    </Grid>
                ))}
            </Grid2>
            <Grid container sx={{ marginBottom: "30px" }}>
                <CardProduct products={dataHome.collections?.[isSelected].data} />
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    variant='outlined'
                    color='warning'
                    className={classes.seeAllBtn}
                    sx={{ textTransform: "none" }}
                >
                    Xem tất cả
                    <ArrowForwardIosIcon
                        sx={{ fontSize: "14px", position: "relative", top: "1px" }}
                    />
                </Button>
            </Grid>
        </Container>
    );
};

export default CollectionProduct;
