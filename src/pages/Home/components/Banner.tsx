import { makeStyles } from "@mui/styles";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const useStyles = makeStyles({
    bannerImg: {
        width: "100%",
    },
    paginationBullet: {
        height: "4px",
        borderRadius: "2px",
        width: "16px",
        border: "1px solid #fff",
        background: "#fff",
        margin: " 0 3px",
        opacity: 0.5,
    },
    paginationBulletActive: {
        borderColor: "#cd6420",
        backgroundColor: "#cd6420",
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
});

const Banner = () => {
    const { dataHome } = useSelector((state: RootState) => state.others);
    const classes = useStyles();
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Swiper
                spaceBetween={30}
                loop={true}
                loopFillGroupWithBlank={true}
                effect={"fade"}
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
                pagination={{
                    clickable: true,
                    bulletClass: classes.paginationBullet + " swiper-pagination-bullet",
                    bulletActiveClass:
                        classes.paginationBulletActive + " swiper-pagination-bullet-active",
                    renderBullet: (index, className) => {
                        return `<span class='${className}'></span>`;
                    },
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className='mySwiper'
            >
                {dataHome.bannerUrls?.map((url: string, index: number) => (
                    <SwiperSlide key={index}>
                        <img src={url} alt='banner' className={classes.bannerImg} />
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
        </>
    );
};

export default Banner;
