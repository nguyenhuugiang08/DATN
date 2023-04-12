import { Container, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "redux/productSlice";
import { RootState, useAppDispatch } from "redux/store";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductInfo from "./components/ProductInfo";
import ProductPolicies from "./components/ProductPolicies";
import ProductReturnPolicies from "./components/ProductReturnPolicies";
import { makeStyles } from "@mui/styles";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Thumbnail } from "interfaces/interface";

const useStyles = makeStyles({
    gallery: {
        width: "90px",
        height: "120px",
    },
    thumbnail: {
        width: "100%",
    },
    prevBtn: {
        top: "50%",
        fontSize: 0,
        position: "absolute",
        width: "44px",
        height: "44px",
        padding: 0,
        transform: "translate(0, -50%)",
        cursor: "pointer",
        color: "transparent",
        outline: "none",
        border: "1px solid #ebebeb",
        background: "#ebebeb",
        lineHeight: "44px",
        textAlign: "center",
        overflow: "hidden",
        opacity: 0.7,
        borderRadius: "100%",
        zIndex: 1,
        left: "10px",

        "&:hover": {
            backgroundColor: "#fff",
        },
    },
    nextBtn: {
        top: "50%",
        fontSize: 0,
        position: "absolute",
        width: "44px",
        height: "44px",
        padding: 0,
        transform: "translate(0, -50%)",
        cursor: "pointer",
        color: "transparent",
        outline: "none",
        border: "1px solid #ebebeb",
        background: "#ebebeb",
        lineHeight: "44px",
        textAlign: "center",
        overflow: "hidden",
        opacity: 0.7,
        borderRadius: "100%",
        zIndex: 1,
        right: "10px",

        "&:hover": {
            backgroundColor: "#fff",
        },
    },
    thumbActive: {
        border: "2px solid #cd6420",
        borderRadius: "6px",
    },
});

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const classes = useStyles();

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [indexActive, setIndexActive] = useState(0);

    const dispatch = useAppDispatch();
    const { product } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ p: 4 }}>
                    <Swiper
                        spaceBetween={10}
                        navigation={{
                            prevEl: prevRef.current ? prevRef.current : undefined,
                            nextEl: nextRef.current ? nextRef.current : undefined,
                        }}
                        onBeforeInit={(swiper) => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            // eslint-disable-next-line no-param-reassign
                            swiper.params.navigation.prevEl = prevRef.current;
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            // eslint-disable-next-line no-param-reassign
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.update();
                        }}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        onRealIndexChange={(slide) => setIndexActive(slide.activeIndex)}
                        className='mySwiper2'
                    >
                        {product.thumbnails?.map((thumbnail: Thumbnail) => (
                            <SwiperSlide key={thumbnail.urlId}>
                                <img
                                    src={thumbnail.url}
                                    alt='thumbnail'
                                    className={classes.thumbnail}
                                />
                            </SwiperSlide>
                        ))}
                        <div ref={prevRef} className={classes.prevBtn}>
                            <ArrowBackIosNewIcon
                                fontSize='small'
                                sx={{
                                    color: "#000",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        </div>
                        <div ref={nextRef} className={classes.nextBtn}>
                            <ArrowForwardIosIcon
                                fontSize='small'
                                sx={{
                                    color: "#000",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        </div>
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper as any}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        style={{ paddingTop: "16px" }}
                        className='mySwiper'
                    >
                        {product.thumbnails?.map((thumbnail: Thumbnail, index: number) => (
                            <SwiperSlide
                                key={thumbnail.urlId}
                                style={{ cursor: "pointer" }}
                                className={`${index === indexActive && classes.thumbActive}`}
                            >
                                <img
                                    src={thumbnail.url}
                                    alt='thumbnail'
                                    className={classes.gallery}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ProductInfo product={product} />
                    <ProductPolicies />
                    <ProductReturnPolicies />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
