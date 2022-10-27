import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Box, Typography, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    collectionsHeading: {
        width: "100%",
        fontSize: "2em",
        lineHeight: 1.2,
        marginBottom: "30px",
    },
    collectionsCotanier: {
        textAlign: "center",
    },
    collectionsImage: {
        paddingTop: "100%",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
    },
    collectionsCategory: {
        fontWeight: "600 !important",
        fontSize: "18px !important",
        marginTop: "10px !important",
    },
    collectionsNumber: {
        opacity: 0.75,
        fontSize: "14px !important",
        lineHeight: "21px !important",
    },
});

const Collections: React.FC = () => {
    const { dataHome } = useSelector((state: RootState) => state.others);
    const classes = useStyles();

    return (
        <Container className={classes.collectionsCotanier}>
            <Box className={classes.collectionsHeading}>Thời Trang EGA</Box>
            <Swiper spaceBetween={30} slidesPerView={6} className='mySwiper'>
                {dataHome.egaFashions?.map((category) => (
                    <SwiperSlide key={category.categoryName}>
                        <Box
                            sx={{ backgroundImage: `url(${category.thumbnail})` }}
                            className={classes.collectionsImage}
                        ></Box>
                        <Typography className={classes.collectionsCategory}>
                            {category.categoryName}
                        </Typography>
                        <Typography className={classes.collectionsNumber}>
                            {category.number} sản phẩm
                        </Typography>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
};

export default Collections;
