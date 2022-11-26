import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Collapse, ListItemButton, ListItemText, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
    policyTitle: {
        color: "#666666",
        fontSize: "18px",
        fontWeight: 600,
        margin: "16px 0",
    },
    policyText: {
        marginBottom: "16px",
        color: "#666666",
    },
});

const ProductPolicies: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    return (
        <Box>
            <ListItemButton onClick={() => setIsOpen(!isOpen)}>
                <ListItemText primary='Chính sách giao hàng' />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout='auto' unmountOnExit sx={{ paddingLeft: "16px" }}>
                <Typography className={classes.policyTitle}>CHÍNH SÁCH GIAO HÀNG</Typography>
                <Typography className={classes.policyText}>
                    EGA Style có dịch vụ giao hàng tận nơi trên toàn quốc, áp dụng cho khách mua
                    hàng trên website, fanpage và gọi điện thoại, không áp dụng cho khách mua trực
                    tiếp tại cửa hàng.
                </Typography>
                <Typography className={classes.policyText}>
                    Đơn hàng sẽ được chuyển phát đến tận địa chỉ khách hàng cung cấp thông qua công
                    ty vận chuyển trung gian.
                </Typography>
                <strong>1. Thời gian giao hàng:</strong>
                <li style={{ padding: "16px 0" }}>Đơn hàng nội và ngoại thành TP.HCM:</li>
                <Typography className={classes.policyText}>
                    Thời gian giao hàng là 1-2 ngày sau khi đặt hàng. Đơn hang trước 11h30 trưa thì
                    sẽ giao trong buổi chiều cùng ngày Đơn hàng sau 11h30 sẽ giao trong buổi tối và
                    sáng hôm sau.
                </Typography>
                <li style={{ padding: "16px" }}>Đơn hàng ở các tỉnh thành khác:</li>
                <Typography className={classes.policyText}>
                    <Typography className={classes.policyText}>
                        Thời gian là 2-3 ngày đối với khu vực trung tâm tỉnh thành phố, 3-7 ngày đối
                        với khu vực ngoại thành, huyện, xã, thị trấn…
                    </Typography>
                    <Typography className={classes.policyText}>
                        (Không tính thứ bảy, chủ nhật hay các ngày lễ tết)
                    </Typography>
                    <Typography className={classes.policyText}>
                        Thời gian xử lý đơn hàng sẽ được tính từ khi nhận được thanh toán hoàn tất
                        của quý khách.
                    </Typography>
                    <Typography className={classes.policyText}>
                        Có thể thay đổi thời gian giao hàng nếu khách hàng yêu cầu và EGA Style chủ
                        động đổi trong trường hợp chịu ảnh hưởng của thiên tai hoặc các sự kiện đặc
                        biệt khác.
                    </Typography>
                    <Typography className={classes.policyText}>
                        Đơn hàng của quý khách sẽ được giao tối đa trong 2 lần. Trường hợp lần đầu
                        giao hàng không thành công, sẽ có nhân viên liên hệ để sắp xếp lịch giao
                        hàng lần 2 với quý khách, trong trường hợp vẫn không thể liên lạc lại được
                        hoặc không nhận được bất kì phản hồi nào từ phía quý khách, đơn hàng sẽ
                        không còn hiệu lực.
                    </Typography>
                    <Typography className={classes.policyText}>
                        Để kiểm tra thông tin hoặc tình trạng đơn hàng của quý khách, xin vui lòng
                        inbox fanpage hoặc gọi số hotline, cung cấp tên, số điện thoại để được kiểm
                        tra.
                    </Typography>
                    <Typography className={classes.policyText}>
                        Khi hàng được giao đến quý khách, vui lòng ký xác nhận với nhân viên giao
                        hàng và kiểm tra lại số lượng cũng như loại hàng hóa được giao có chính xác
                        không. Xin quý khách vui lòng giữ lại biên lại vận chuyển và hóa đơn mua
                        hàng để đối chiếu kiểm tra.
                    </Typography>
                </Typography>
                <strong>2. Phí giao hàng:</strong>
                <li style={{ padding: "16px" }}>
                    Phí ship cố định là 30,000đ áp dụng cho mọi khu vực
                </li>
            </Collapse>
        </Box>
    );
};
export default ProductPolicies;
