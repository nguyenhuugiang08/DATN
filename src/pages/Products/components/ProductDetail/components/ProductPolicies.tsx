import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

const ProductPolicies: React.FC = () => {
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.policyTitle}>chính sách giao hàng</Typography>
            <Box sx={{ marginLeft: "14px", marginBottom: "30px" }}>
                <Typography className={classes.policyText}>
                    HUUGIANG shop có dịch vụ giao hàng tận nơi trên toàn quốc, áp dụng cho khách mua
                    hàng trên website, fanpage và gọi điện thoại, không áp dụng cho khách mua trực
                    tiếp tại cửa hàng.
                </Typography>
                <Typography className={classes.policyText}>
                    Đơn hàng sẽ được chuyển phát đến tận địa chỉ khách hàng cung cấp thông qua công
                    ty vận chuyển trung gian.
                </Typography>
                <Typography className={classes.policyText}>1. Thời gian giao hàng:</Typography>
                <Typography className={classes.policyText}>
                    Đơn hàng nội và ngoại thành TP.HCM:
                </Typography>
                <Typography className={classes.policyText}>
                    Thời gian giao hàng là 1-2 ngày sau khi đặt hàng. Đơn hang trước 11h30 trưa thì
                    sẽ giao trong buổi chiều cùng ngày Đơn hàng sau 11h30 sẽ giao trong buổi tối và
                    sáng hôm sau.
                </Typography>
                <Typography className={classes.policyText}>
                    Đơn hàng ở các tỉnh thành khác:
                </Typography>
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
                <Typography className={classes.policyText}>2. Phí giao hàng:</Typography>
                <Typography className={classes.policyText}>
                    Phí ship cố định là 30,000đ áp dụng cho mọi khu vực
                </Typography>
            </Box>
        </div>
    );
};
export default ProductPolicies;
