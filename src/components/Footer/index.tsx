import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faMobileScreenButton,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Grid } from "@mui/material";
import "./footer.scss";

const Footer: React.FC = (): JSX.Element => {
    return (
        <Container className={`footer`} maxWidth='xxl'>
            <Grid container>
                <Grid item xs={12} md={6} xl={3} className='footer-block'>
                    <h3 className='footer-block-title'>THÔNG TIN LIÊN HỆ</h3>
                    <div className='footer-block-wrapper'>
                        <FontAwesomeIcon
                            className='footer-block-wrapper--icon'
                            icon={faLocationDot}
                        ></FontAwesomeIcon>
                        <span>Địa chỉ: Quận Bắc Từ Liêm, Hà Nội.</span>
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
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;
