import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Container, Grid, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import "./header.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Header() {
    return (
        <>
            <Container className='header-container'>
                <Grid container>
                    <ImageListItem className='header-logo'>
                        <img
                            src={`https://bizweb.dktcdn.net/100/448/042/themes/874342/assets/logo.png?1663920615279`}
                            srcSet={``}
                            alt={`logo`}
                            loading='lazy'
                        />
                    </ImageListItem>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        navigation={true}
                        modules={[Navigation]}
                        className='mySwiper header-link'
                    >
                        <SwiperSlide className='header-link--wrapper'>
                            <Link to='/' className='header-link__item'>
                                Trang chủ
                            </Link>
                            <Link to='/' className='header-link__item'>
                                Sản phẩm
                            </Link>
                            <Link to='/' className='header-link__item'>
                                Chương trình khuyến mại
                            </Link>
                            <Link to='/' className='header-link__item'>
                                Đơn hàng
                            </Link>
                            <Link to='/' className='header-link__item'>
                                Hệ thống cửa hàng
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide className='header-link--wrapper'>
                            <Link to='/' className='header-link__item'>
                                Giới thiệu
                            </Link>
                            <Link to='/' className='header-link__item'>
                                Tin tức
                            </Link>
                            <Link to='/' className='header-link__item'>
                                Liên hệ
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                    <div className='header-icon'>
                        <FontAwesomeIcon className='header-icon__item' icon={faMagnifyingGlass} />
                        <FontAwesomeIcon className='header-icon__item' icon={faUser} />
                        <FontAwesomeIcon className='header-icon__item' icon={faCartShopping} />
                    </div>
                </Grid>
            </Container>
        </>
    );
}

export default Header;
