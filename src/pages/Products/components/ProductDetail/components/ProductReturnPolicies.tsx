import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Collapse, ListItemButton, ListItemText, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
    policyText: {
        marginBottom: "16px",
        color: "#666666",
    },
});

const ProductReturnPolicies: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    return (
        <Box>
            <ListItemButton onClick={() => setIsOpen(!isOpen)}>
                <ListItemText primary='Chính sách đổi trả' />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout='auto' unmountOnExit sx={{ paddingLeft: "16px" }}>
                <strong style={{ marginTop: "16px", display: "block" }}>1. Điều kiện đổi trả</strong>
                <Typography sx={{ marginTop: "16px" }}>
                    Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng
                    ngay tại thời điểm giao/nhận hàng trong những trường hợp sau:
                </Typography>
                <li style={{ padding: "16px" }}>
                    Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website
                    tại thời điểm đặt hàng.
                </li>
                <li style={{ padding: "16px" }}>
                    Không đủ số lượng, không đủ bộ như trong đơn hàng.
                </li>
                <li style={{ padding: "16px" }}>
                    Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…
                </li>
                <Typography className={classes.policyText}>
                    Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên
                    để hoàn thành việc hoàn trả/đổi trả hàng hóa.
                </Typography>
                <strong>2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</strong>
                <li style={{ padding: "16px" }}>
                    Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm đối với
                    trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.
                </li>
                <li style={{ padding: "16px" }}>
                    Thời gian gửi chuyển trả sản phẩm: trong vòng 14 ngày kể từ khi nhận sản phẩm.
                </li>
                <li style={{ padding: "16px" }}>
                    Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp đến văn phòng/
                    cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.
                </li>
                <Typography className={classes.policyText}>
                    Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất
                    lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng
                    của chúng tôi.
                </Typography>
            </Collapse>
        </Box>
    );
};
export default ProductReturnPolicies;
