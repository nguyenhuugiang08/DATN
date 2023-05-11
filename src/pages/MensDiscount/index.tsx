import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import { useEffect, useState } from "react";
import { getProductDiscount, resetProduct } from "redux/productSlice";
import CardProduct from "components/CardProduct";
import { Container, Grid, Button, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowDownShortWide,
    faArrowUpShortWide,
    faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import Loading from "components/Loading";
import NotFound from "components/NotFound";

const useStyles = makeStyles({
    filterHeading: {
        fontSize: "46px",
        fontWeight: "bold",
        margin: "20px -24px",
        paddingLeft: "24px",
        borderBottom: "1px solid #d9d9d9",
    },
    filter: {
        alignItems: "center",
        background: "#f3f4f6",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        color: "#444",
        cursor: "pointer",
        display: "flex",
        fontSize: "12px",
        height: "30px",
        padding: "5px 10px",
        whiteSpace: "nowrap",
        fontWeight: 400,
        position: "relative",
    },
    more: {
        marginTop: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

const MensDiscount = () => {
    const dispatch = useAppDispatch();
    const { discountProducts, loading, hasMore, isProgress } = useSelector(
        (state: RootState) => state.product
    );
    const classes = useStyles();
    const [sort, setSort] = useState<number | string>(localStorage.getItem("sort-trouser") || "");
    const [page, setPage] = useState<number | string>(1);
    const [more, setMore] = useState(true);

    const location = useLocation();

    useEffect(() => {
        dispatch(resetProduct());
    }, [location]);

    useEffect(() => {
        dispatch(
            getProductDiscount({
                page: page,
                sortType: sort,
            })
        );
    }, [dispatch, sort, page]);

    const handleSort = (sortType: number | string) => {
        try {
            setPage(1);
            setSort(sortType);
            localStorage.setItem("sort-trouser", JSON.stringify(sortType));
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowMore = () => {
        setPage((prev: number | string) => Number(prev) + 1);
        setMore(false);
    };

    return (
        <Container maxWidth='xl' sx={{ marginBottom: "32px" }}>
            <Grid>
                <img
                    src='https://mcdn.coolmate.me/image/April2023/mceclip0_90.png'
                    style={{ width: "100%", height: "250px", marginTop: "20px" }}
                ></img>
            </Grid>
            <Grid className={classes.filterHeading}> Giảm giá</Grid>
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "10px 0 32px 0",
                }}
            >
                <Grid
                    sx={{
                        marginRight: "10px",
                    }}
                >
                    Sắp xếp theo:
                </Grid>
                <div
                    className={`${classes.filter} ${
                        sort === 1 || sort === "1" ? "sort-active" : ""
                    }`}
                    style={{ width: "max-content", marginRight: "10px" }}
                    onClick={() => handleSort(1)}
                >
                    <FontAwesomeIcon style={{ marginRight: "6px" }} icon={faArrowDownShortWide} />
                    Giá Cao - Thấp
                </div>
                <div
                    className={`${classes.filter} ${
                        sort === 2 || sort === "2" ? "sort-active" : ""
                    }`}
                    style={{ width: "max-content", marginRight: "10px" }}
                    onClick={() => handleSort(2)}
                >
                    <FontAwesomeIcon style={{ marginRight: "6px" }} icon={faArrowUpShortWide} />
                    Giá Thấp - Cao
                </div>
                <div
                    className={`${classes.filter} ${
                        sort === 3 || sort === "3" ? "sort-active" : ""
                    }`}
                    style={{ width: "max-content", marginRight: "10px" }}
                    onClick={() => handleSort(3)}
                >
                    <FontAwesomeIcon style={{ marginRight: "6px" }} icon={faPercent} /> Khuyến mại
                    hot
                </div>
            </Grid>
            {loading && more ? (
                <Loading spacing={2} columns={10} totalColumn={2} />
            ) : discountProducts?.length ? (
                <CardProduct products={discountProducts} spacing={2} totalColumn={2} columns={10} />
            ) : (
                <NotFound />
            )}
            {hasMore ? (
                <Grid className={classes.more}>
                    <Button onClick={handleShowMore}>Xem thêm</Button>
                </Grid>
            ) : isProgress ? (
                <Grid className={classes.more}>
                    <CircularProgress color='inherit' />
                </Grid>
            ) : (
                <></>
            )}
        </Container>
    );
};
export default MensDiscount;
