import { Container, Grid } from "@mui/material";

const Footer: React.FC = (): JSX.Element => {
    return (
        <div>
            <Container>
                <Grid container>
                    <Grid item xs={3}>
                        xs=8
                    </Grid>
                    <Grid item xs={3}>
                        CHÍNH SÁCH
                    </Grid>
                    <Grid item xs={3}>
                        HỖ TRỢ KHÁCH HÀNG
                    </Grid>
                    <Grid item xs={3}>
                        ĐĂNG KÝ NHẬN TIN
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Footer;
