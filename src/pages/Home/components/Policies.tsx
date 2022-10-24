import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    policy: {
        marginTop: "30px",
        marginBottom: "30px",
    },
    policyImage: {
        height: "40px",
        width: "40px",
    },
    policyThumbnail: {
        paddingTop: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    policyDescription: {
        opacity: 0.75,
        fontSize: "14px !important",
        lineHeight: "21px !important",
    },
    policyTitle: {
        textTransform: "capitalize",
        fontWeight: "bold",
    },
});

export interface PolicyProps {
    title: string;
    description: string;
    thumbnails: string;
}

const Policy: React.FC<PolicyProps> = ({ title, description, thumbnails }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
            <Box className={classes.policyImage} sx={{ mr: 2 }}>
                <Box sx={{ backgroundImage: thumbnails }} className={classes.policyThumbnail}></Box>
            </Box>
            <Box>
                <Typography className={classes.policyTitle}>{title}</Typography>
                <Typography className={classes.policyDescription}>{description}</Typography>
            </Box>
        </Grid>
    );
};

const Policies: React.FC = () => {
    const classes = useStyles();
    return (
        <Container className={classes.policy}>
            <Grid container>
                <Policy
                    title='miễn phí vận chuyển'
                    description='Nhận hàng trong vòng 3 ngày'
                    thumbnails='url(https://bizweb.dktcdn.net/100/448/042/themes/876420/assets/policies_icon_1.png?1666596948466)'
                />
                <Policy
                    title='Quà tặng hấp dẫn'
                    description='Nhiều ưu đãi khuyến mãi hot'
                    thumbnails='url(https://bizweb.dktcdn.net/100/448/042/themes/876420/assets/policies_icon_2.png?1666596948466)'
                />
                <Policy
                    title='Bảo đảm chất lượng'
                    description='Sản phẩm đã dược kiểm định'
                    thumbnails='url(https://bizweb.dktcdn.net/100/448/042/themes/876420/assets/policies_icon_3.png?1666596948466)'
                />
                <Policy
                    title='Hotline: 19006750'
                    description='Dịch vụ hỗ trợ bạn 24/7'
                    thumbnails='url(https://bizweb.dktcdn.net/100/448/042/themes/876420/assets/policies_icon_4.png?1666596948466)'
                />
            </Grid>
        </Container>
    );
};

export default Policies;
