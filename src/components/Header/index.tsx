import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Container, Grid, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import "./header.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HG_RESOURCE } from "base/resource";

function Header() {
    return (
        <>
            <Container maxWidth='xl' className='header-container'>
                <Grid container>
                    <ImageListItem className='header-logo'>
                        <img
                            src='/logo1.png'
                            srcSet={``}
                            alt={`logo`}
                            loading='lazy'
                        />
                    </ImageListItem>
                    <div className='mySwiper header-link'>
                        {HG_RESOURCE.CATEGORY.map((category, index) => (
                            <Link to={category.path} key={index} className='header-link__item'>
                                {category.title}
                            </Link>
                        ))}
                    </div>
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
