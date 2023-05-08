import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import { useEffect, useState } from "react";
import { getProductsByCategoryId, resetProduct } from "redux/productSlice";
import { HG_RESOURCE } from "base/resource";
import CardProduct from "components/CardProduct";
import { Container, Grid, CircularProgress, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MultiRangeSlider from "multi-range-slider-react";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { formatPrice } from "utilities/formatPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowDownShortWide,
    faArrowUpShortWide,
    faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "interfaces/interface";
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

const MensAccessories = () => {
    const dispatch = useAppDispatch();
    const { categoryProducts, loading, hasMore, isProgress } = useSelector(
        (state: RootState) => state.product
    );
    const classes = useStyles();
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [isFilter, setIsFilter] = useState(false);
    const [sort, setSort] = useState<number | string>(
        localStorage.getItem("sort-accessories") || ""
    );
    const [page, setPage] = useState<number | string>(1);
    const [more, setMore] = useState(true);

    const location = useLocation();

    useEffect(() => {
        dispatch(resetProduct());
    }, [location]);

    useEffect(() => {
        dispatch(
            getProductsByCategoryId({
                categoryId: HG_RESOURCE.MEN_ACCESSORIES,
                minPrice: minValue * 9990,
                maxPrice: maxValue * 9990,
                page: page,
                sortType: sort,
            })
        );
    }, [dispatch, sort, page]);

    const handleFilterProduct = () => {
        dispatch(
            getProductsByCategoryId({
                categoryId: HG_RESOURCE.MEN_ACCESSORIES,
                minPrice: minValue * 9990,
                maxPrice: maxValue * 9990,
                page: page,
                sortType: sort,
            })
        );
        setIsFilter(false);
    };

    const handleSort = (sortType: number | string) => {
        try {
            setSort(sortType);
            localStorage.setItem("sort-accessories", JSON.stringify(sortType));
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
            <Grid className={classes.filterHeading}> Phụ kiện nam</Grid>
            <Grid
                sx={{
                    width: "max-content",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                <Grid sx={{ marginRight: "10px" }}>Lọc theo: </Grid>
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className={classes.filter} onClick={() => setIsFilter(!isFilter)}>
                        <PriceChangeIcon fontSize='small' sx={{ marginRight: "6px" }} />
                        Giá
                    </div>
                    <span
                        style={{
                            fontSize: "12px",
                            color: "var(--primary-color)",
                            marginLeft: "10px",
                        }}
                    >
                        Giá từ {formatPrice(minValue * 9990)}đ đến {formatPrice(maxValue * 9990)}đ
                    </span>
                    <div
                        className='list-filter-child'
                        style={{
                            opacity: isFilter ? 1 : 0,
                            display: isFilter ? "block" : "none",
                        }}
                    >
                        <div className='price-filter-range'>
                            <div className='range-header'>
                                <p>{formatPrice(minValue * 9990)}đ</p>{" "}
                                <p>{formatPrice(maxValue * 9990)}đ</p>
                            </div>
                            <div
                                className='vue-slider vue-slider-ltr'
                                style={{ padding: " 9px 0px", width: "auto", height: "8px" }}
                            ></div>
                        </div>
                        <MultiRangeSlider
                            min={0}
                            max={100}
                            minValue={minValue}
                            maxValue={maxValue}
                            onInput={(e) => {
                                setMinValue(e.minValue);
                                setMaxValue(e.maxValue);
                            }}
                            label={false}
                            ruler={false}
                            style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
                            barLeftColor='#9f9d9d'
                            barInnerColor='var(--primary-color)'
                            barRightColor='#9f9d9d'
                            thumbLeftColor='#fff'
                            thumbRightColor='#fff'
                        />
                        <div className='show btn-filter-group'>
                            <button className='button is-light'>Đóng</button>{" "}
                            <button className='button submit' onClick={handleFilterProduct}>
                                Xem kết quả
                            </button>
                        </div>
                    </div>
                </div>
            </Grid>
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
            ) : categoryProducts?.length ? (
                <CardProduct products={categoryProducts} spacing={2} totalColumn={2} columns={10} />
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
export default MensAccessories;
