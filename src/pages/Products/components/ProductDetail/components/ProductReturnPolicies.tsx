import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Collapse, ListItemButton, ListItemText, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
    policyTitle: {
        color: "#000",
        fontSize: "18px !important",
        fontWeight: "500 !important",
        margin: "16px 0",
        textTransform: "uppercase",
        width: "100%",
        background: "#00000005",
        padding: "12px",
        marginBottom: "10px !important",
    },
    policyText: {
        marginBottom: "16px",
        color: "#666666",
        fontSize: "14px !important",
        lineHeight: "2.5 !important",
    },
});

const ProductReturnPolicies: React.FC = () => {
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.policyTitle}>Chính sách đổi trả</Typography>
            <Box sx={{ marginLeft: "14px", marginBottom: "30px" }}>
                <Typography className={classes.policyText}>1. Điều kiện đổi trả</Typography>
                <Typography className={classes.policyText}>
                    Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng
                    ngay tại thời điểm giao/nhận hàng trong những trường hợp sau:
                </Typography>
                <Typography className={classes.policyText}>
                    Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website
                    tại thời điểm đặt hàng.
                </Typography>
                <Typography className={classes.policyText}>
                    Không đủ số lượng, không đủ bộ như trong đơn hàng.
                </Typography>
                <Typography className={classes.policyText}>
                    Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…
                </Typography>
                <Typography className={classes.policyText}>
                    Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên
                    để hoàn thành việc hoàn trả/đổi trả hàng hóa.
                </Typography>
                <Typography className={classes.policyText}>
                    2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả
                </Typography>
                <Typography className={classes.policyText}>
                    Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm đối với
                    trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.
                </Typography>
                <Typography className={classes.policyText}>
                    Thời gian gửi chuyển trả sản phẩm: trong vòng 14 ngày kể từ khi nhận sản phẩm.
                </Typography>
                <Typography className={classes.policyText}>
                    Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp đến văn phòng/
                    cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.
                </Typography>
                <Typography className={classes.policyText}>
                    Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất
                    lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng
                    của chúng tôi.
                </Typography>
            </Box>
        </div>
    );
};
export default ProductReturnPolicies;
