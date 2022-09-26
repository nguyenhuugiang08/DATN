import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faMobileScreenButton,
    faEnvelope,
    faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Grid } from "@mui/material";
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer: React.FC = (): JSX.Element => {
    return (
        <Container className='footer' maxWidth='xl'>
            <Container maxWidth='lg'>
                <Grid container maxWidth='lg'>
                    <Grid item xs={12} md={6} xl={3} className='footer-block'>
                        <Link to='/'>
                            <img
                                className='footer-block-img'
                                src='https://bizweb.dktcdn.net/100/448/042/themes/874342/assets/logo-footer.png?1663920615279'
                                alt='logo'
                            />
                        </Link>
                        <div className='footer-block-wrapper'>
                            <FontAwesomeIcon
                                className='footer-block-wrapper--icon'
                                icon={faLocationDot}
                            ></FontAwesomeIcon>
                            <span>Địa chỉ: 70 Lu Gia, District 11, Ho Chi Minh City.</span>
                        </div>
                        <div className='footer-block-wrapper'>
                            <FontAwesomeIcon
                                className='footer-block-wrapper--icon'
                                icon={faMobileScreenButton}
                            ></FontAwesomeIcon>
                            <span>Số điện thoại: 19006750</span>
                        </div>
                        <div className='footer-block-wrapper'>
                            <FontAwesomeIcon
                                className='footer-block-wrapper--icon'
                                icon={faEnvelope}
                            ></FontAwesomeIcon>
                            <span>Email: egastyle@gmail.com</span>
                        </div>
                        <div className='footer-block-wrapper'>
                            <FontAwesomeIcon
                                className='footer-block-wrapper--icon'
                                icon={faCopyright}
                            ></FontAwesomeIcon>
                            <span>Bản quyền thuộc về EGANY | Cung cấp bởi EGANY</span>
                        </div>
                    </Grid>
                    <Grid item container xs={12} md={6} xl={9}>
                        <Grid item xs={12} md={6} xl={4} className='footer-block'>
                            <h3 className='footer-block-title'>CHÍNH SÁCH</h3>
                            <ul className='footer-list'>
                                <li className='footer-list__item'>Giới thiệu</li>
                                <li className='footer-list__item'>Hệ thống của hàng</li>
                                <li className='footer-list__item'>Câu hỏi thường gặp</li>
                                <li className='footer-list__item'>Gọi điện đặt hàng</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={6} xl={4} className='footer-block'>
                            <h3 className='footer-block-title'>HỖ TRỢ KHÁCH HÀNG</h3>
                            <ul className='footer-list'>
                                <li className='footer-list__item'>Thông tin liên hệ</li>
                                <li className='footer-list__item'>Chính sách giao hàng</li>
                                <li className='footer-list__item'>Chính sách dổi hàng</li>
                                <li className='footer-list__item'>Chính sách bán hàng</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={6} xl={4} className='footer-block'>
                            <h3 className='footer-block-title'>ĐĂNG KÝ NHẬN TIN</h3>
                            <input
                                className='footer-block-input'
                                type='text'
                                placeholder='Nhập địa chỉ email'
                            />
                            <div className='footer-block-container'>
                                <Link to='/' className='footer-block-link'>
                                    <img
                                        src='https://bizweb.dktcdn.net/100/448/042/themes/874342/assets/facebook.png?1663920615279'
                                        alt='facebook'
                                    />
                                </Link>
                                <Link to='/' className='footer-block-link'>
                                    <img
                                        src='https://bizweb.dktcdn.net/100/448/042/themes/874342/assets/zalo.png?1663920615279'
                                        alt='zalo'
                                    />
                                </Link>
                                <Link to='/' className='footer-block-link'>
                                    <img
                                        src='https://bizweb.dktcdn.net/100/448/042/themes/874342/assets/instagram.png?1663920615279'
                                        alt='instagram'
                                    />
                                </Link>
                                <Link to='/' className='footer-block-link'>
                                    <img
                                        src='https://bizweb.dktcdn.net/100/448/042/themes/874342/assets/youtube.png?1663920615279'
                                        alt='youtube'
                                    />
                                </Link>
                                <Link to='/' className='footer-block-link'>
                                    <img
                                        src='https://bizweb.dktcdn.net/100/448/042/themes/874342/assets/tiktok.png?1663920615279'
                                        alt='tiktok'
                                    />
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <img
                                src='https://bizweb.dktcdn.net/100/448/042/themes/874342/assets/footer_trustbadge.png?1663920615279'
                                alt=''
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
};

export default Footer;
