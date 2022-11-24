import {
    Typography,
    Grid,
    Box,
    Button,
    ListItemButton,
    ListItemText,
    Collapse,
} from "@mui/material";
import { formatPrice } from "utilities/formatPrice";
import CardGiftcardTwoToneIcon from "@mui/icons-material/CardGiftcardTwoTone";
import { Product } from "interfaces/interface";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface ProductInfoProps {
    product: Product;
}

const useStyles = makeStyles({
    productName: {
        fontWeight: 700,
        fontSize: "24px !important",
        marginBottom: "8px",
    },
    productDiscount: {
        borderRadius: "999px",
        background: "#d84144",
        color: "#fff",
        alignItems: "center",
        fontSize: "14px",
        padding: "3px 8px",
        fontWeight: "bold",
        marginLeft: "10px",
    },
    productPromotion: {
        padding: "10px",
        position: "relative",
        marginBottom: "16px",
        border: "2px dashed #B00002",
        marginTop: "30px",
        borderRadius: "4px",
    },
    productDiscountCode: {
        border: "1px solid #dc2b2b",
        color: "#dc2b2b",
        borderRadius: "5px",
        padding: "3px 12px",
        fontSize: "14px",
        overflow: "hidden",

        "&:after": {
            content: '""',
            position: "absolute",
            borderRadius: "999px",
            width: "10px",
            height: "10px",
            background: "#fff",
            border: "1px solid #dc2b2b",
            top: "50%",
            transform: "translateY(-50%)",
            right: "-5px",
            zIndex: 1,
        },
        "&:before": {
            content: '""',
            position: "absolute",
            borderRadius: "999px",
            width: "10px",
            height: "10px",
            background: "#fff",
            border: "1px solid #dc2b2b",
            top: "50%",
            transform: "translateY(-50%)",
            left: "-5px",
            zIndex: 1,
        },
    },
    productSize: {
        padding: "10px",
        height: "30px",
        border: "1px solid #cd6420",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "10px",
        position: "relative",
        overflow: "hidden",

        "&:after": {
            content: '""',
            position: "absolute",
            borderRadius: "999px",
            background:
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkCw8RJSHXzNuNAAAAfElEQVQoz7WRsQ2CYBQGLwRCaLRkDwqdwcLCSZjCmj2AgtoJXMbEUquzEAz+8Je89r675sGG59ka0ig+0ZFbJDGbgRwoAXemi/hb1QZw793ebB739cPgTdV2qvzZAFY+VL+VwB4nB59j5RLYhBVXcTBZw7NJDAN49LrFyz67GnkMHStx0wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMS0xNVQxNzozNzozMyswMDowMGfDTJEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTEtMTVUMTc6Mzc6MzMrMDA6MDAWnvQtAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            top: "0px",
            right: "2px",
            width: "6px",
            height: "6px",
            zIndex: 1,
        },

        "&:before": {
            content: '""',
            position: "absolute",
            borderRadius: "999px",
            width: "26px",
            height: "24px",
            background: "#cd6420",
            transform: "rotate(45deg)",
            border: "1px solid #cd6420",
            top: "-15px",
            right: "-15px",
            zIndex: 1,
        },
    },
    btnBuy: {
        width: "100%",
        backgroundColor: "#cd6420 !important",
        color: "#fff !important",
        fontSize: "16px !important",
        margin: "20px 0 6px !important",

        "&:hover": {
            backgroundColor: "#cd6420",
            opacity: 0.8,
        },
    },
    productPolocies: {
        fontSize: "14px",
        borderTop: "1px dashed #ECECEC",
        justifyContent: "space-between",
        padding: "16px",
    },
    productTabs: {
        borderBottom: "1px solid rgb(0 0 0 / 8%)",
    },
});

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const [info, setInfo] = useState({
        size: product?.sizes?.[0],
        color: product?.colors?.[0],
        quantity: 1,
    });

    const [isOpen, setIsOpen] = useState(false);

    const { size, color, quantity } = info;
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.productName}>{product.name}</Typography>
            <Grid container>
                <Box sx={{ mr: 2 }}>
                    Thương hiệu: <span style={{ color: "#007bff" }}>{product.trademark}</span>
                </Box>
                <Box>
                    Mã sản phẩm: <span style={{ color: "#007bff" }}>{product._id}</span>
                </Box>
            </Grid>
            <Box sx={{ margin: "20px 0 10px" }}>
                <Grid container alignItems={"center"}>
                    <Box sx={{ fontSize: "20px", color: "red" }}>
                        {formatPrice(product.price, product.discount)}
                    </Box>
                    <del style={{ margin: "0 6px", fontSize: "16px", color: "#979797" }}>
                        {formatPrice(product.price)}
                    </del>
                    <Box className={classes.productDiscount}>-{product.discount}%</Box>
                </Grid>
                <Box sx={{ fontSize: "14px" }}>
                    (Tiết kiệm:{" "}
                    <span style={{ color: "red" }}>
                        {formatPrice(
                            (
                                Number(product.price) *
                                (1 - Number(product.discount) / 100)
                            ).toString()
                        )}
                    </span>
                    )
                </Box>
            </Box>
            <Box className={classes.productPromotion}>
                <Grid
                    container
                    sx={{
                        position: "absolute",
                        top: "-14px;",
                        background: "#fff",
                        width: "fit-content",
                        zIndex: 1,
                        padding: "0 6px",
                    }}
                >
                    <CardGiftcardTwoToneIcon color='error' />
                    <Typography sx={{ textTransform: "uppercase", ml: 1, color: "#B00002" }}>
                        khuyến mại - ưu đãi
                    </Typography>
                </Grid>
                <ul
                    style={{
                        padding: "8px 8px 8px 15px",
                        listStylePosition: "inside",
                        fontSize: "14px",
                    }}
                >
                    <li style={{ padding: "3px 0" }}>Nhập mã EGANY thêm 5% đơn hàng Sao chép</li>
                    <li style={{ padding: "3px 0" }}>Đồng giá Ship toàn quốc 25.000đ</li>
                    <li style={{ padding: "3px 0" }}>
                        Hỗ trợ 10.000 phí Ship cho đơn hàng từ 200.000đ
                    </li>
                    <li style={{ padding: "3px 0" }}>Miễn phí Ship cho đơn hàng từ 300.000đ</li>
                    <li style={{ padding: "3px 0" }}>
                        Đổi trả trong 30 ngày nếu sản phẩm lỗi bất kì
                    </li>
                </ul>
            </Box>
            <Box sx={{ marginBottom: "16px" }}>
                <strong style={{ marginBottom: "8px", display: "block" }}>Mã giảm giá</strong>
                <Grid container alignContent={"center"}>
                    <Box sx={{ position: "relative", overflow: "hidden", marginRight: "10px" }}>
                        <Box className={classes.productDiscountCode}>EGA10</Box>
                    </Box>
                    <Box sx={{ position: "relative", overflow: "hidden", marginRight: "10px" }}>
                        <Box className={classes.productDiscountCode}>EGA15</Box>
                    </Box>
                    <Box sx={{ position: "relative", overflow: "hidden", marginRight: "10px" }}>
                        <Box className={classes.productDiscountCode}>EGA2022</Box>
                    </Box>
                    <Box sx={{ position: "relative", overflow: "hidden", marginRight: "10px" }}>
                        <Box className={classes.productDiscountCode}>EGAFREESHIP</Box>
                    </Box>
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "16px" }}>
                <span style={{ marginBottom: "8px", display: "block" }}>
                    <strong>Kích thước:</strong> {size}
                </span>

                <Grid container>
                    {product?.sizes?.map((size: string, index: number) => (
                        <Box
                            key={index}
                            onClick={() => setInfo({ ...info, size: size })}
                            className={classes.productSize}
                        >
                            {size}
                        </Box>
                    ))}
                </Grid>
            </Box>
            <Box>
                <span style={{ marginBottom: "8px", display: "block" }}>
                    <strong>Màu sắc: </strong>
                    {color}
                </span>
                <Grid container>
                    {product?.colors?.map((color: string, index: number) => (
                        <Box key={index} onClick={() => setInfo({ ...info, color: color })}>
                            {color}
                        </Box>
                    ))}
                </Grid>
            </Box>
            <Grid container>
                <Box>
                    <RemoveIcon fontSize='small' />
                    {quantity}
                    <AddIcon fontSize='small' />
                </Box>
                <Button color='warning' variant='outlined'>
                    thêm vào giỏ
                </Button>
            </Grid>
            <Button color='warning' variant='outlined' className={classes.btnBuy}>
                mua ngay
            </Button>
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                Gọi đặt mua{" "}
                <Link to='/' style={{ textDecoration: "none", color: "#cd6420" }}>
                    1900.6750
                </Link>{" "}
                (7:30 - 22:00)
            </Box>
            <Grid container className={classes.productPolocies}>
                <Grid item xs={4}>
                    <img
                        src='https://bizweb.dktcdn.net/100/448/042/themes/876420/assets/policy_product_image_1.png?1669109195523'
                        alt='anh'
                    />{" "}
                    Giao hàng toàn quốc
                </Grid>
                <Grid item xs={4}>
                    <img
                        src='https://bizweb.dktcdn.net/100/448/042/themes/876420/assets/policy_product_image_2.png?1669109195523'
                        alt='anh'
                    />{" "}
                    Tích điểm tất cả sản phẩm
                </Grid>
                <Grid item xs={4}>
                    <img
                        src='https://bizweb.dktcdn.net/100/448/042/themes/876420/assets/policy_product_image_3.png?1669109195523'
                        alt='anh'
                    />{" "}
                    Giảm 5% khi thanh toán online
                </Grid>
            </Grid>
            <Box>
                <ListItemButton onClick={() => setIsOpen(!isOpen)}>
                    <ListItemText primary='Mô tả sản phẩm' />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                    {product?.description}
                </Collapse>
            </Box>
            <Box>
                <ListItemButton onClick={() => setIsOpen(!isOpen)}>
                    <ListItemText primary='Mô tả sản phẩm' />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                    CHÍNH SÁCH GIAO HÀNG EGA Style có dịch vụ giao hàng tận nơi trên toàn quốc, áp
                    dụng cho khách mua hàng trên website, fanpage và gọi điện thoại, không áp dụng
                    cho khách mua trực tiếp tại cửa hàng. Đơn hàng sẽ được chuyển phát đến tận địa
                    chỉ khách hàng cung cấp thông qua công ty vận chuyển trung gian. 1. Thời gian
                    giao hàng: Đơn hàng nội và ngoại thành TP.HCM: Thời gian giao hàng là 1-2 ngày
                    sau khi đặt hàng. Đơn hang trước 11h30 trưa thì sẽ giao trong buổi chiều cùng
                    ngày Đơn hàng sau 11h30 sẽ giao trong buổi tối và sáng hôm sau. Đơn hàng ở các
                    tỉnh thành khác: Thời gian là 2-3 ngày đối với khu vực trung tâm tỉnh thành phố,
                    3-7 ngày đối với khu vực ngoại thành, huyện, xã, thị trấn… (Không tính thứ bảy,
                    chủ nhật hay các ngày lễ tết) Thời gian xử lý đơn hàng sẽ được tính từ khi nhận
                    được thanh toán hoàn tất của quý khách. Có thể thay đổi thời gian giao hàng nếu
                    khách hàng yêu cầu và EGA Style chủ động đổi trong trường hợp chịu ảnh hưởng của
                    thiên tai hoặc các sự kiện đặc biệt khác. Đơn hàng của quý khách sẽ được giao
                    tối đa trong 2 lần. Trường hợp lần đầu giao hàng không thành công, sẽ có nhân
                    viên liên hệ để sắp xếp lịch giao hàng lần 2 với quý khách, trong trường hợp vẫn
                    không thể liên lạc lại được hoặc không nhận được bất kì phản hồi nào từ phía quý
                    khách, đơn hàng sẽ không còn hiệu lực. Để kiểm tra thông tin hoặc tình trạng đơn
                    hàng của quý khách, xin vui lòng inbox fanpage hoặc gọi số hotline, cung cấp
                    tên, số điện thoại để được kiểm tra. Khi hàng được giao đến quý khách, vui lòng
                    ký xác nhận với nhân viên giao hàng và kiểm tra lại số lượng cũng như loại hàng
                    hóa được giao có chính xác không. Xin quý khách vui lòng giữ lại biên lại vận
                    chuyển và hóa đơn mua hàng để đối chiếu kiểm tra. 2. Phí giao hàng: Phí ship cố
                    định là 30,000đ áp dụng cho mọi khu vực
                </Collapse>
            </Box>
        </div>
    );
};
export default ProductInfo;
