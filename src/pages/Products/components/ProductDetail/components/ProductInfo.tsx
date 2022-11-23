import { Typography, Grid, Box } from "@mui/material";
import { formatPrice } from "utilities/formatPrice";
import CardGiftcardTwoToneIcon from "@mui/icons-material/CardGiftcardTwoTone";
import { Product } from "interfaces/interface";

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    return (
        <div>
            <Typography>{product.name}</Typography>
            <Grid container>
                <Box sx={{mr: 2}}>Thương hiệu: {product.trademark}</Box>
                <Box>Mã sản phẩm: {product._id}</Box>
            </Grid>
            <Box>
                <Box>{formatPrice(product.price, product.discount)}</Box>
                <del>{formatPrice(product.price)}</del>
                <Box>-{product.discount}%</Box>
            </Box>
            <Box>
                (Tiết kiệm:{" "}
                {formatPrice((Number(product.price) * (100 - Number(product.discount))).toString())}
                )
            </Box>
            <Grid container>
                <CardGiftcardTwoToneIcon color='error' />
                <Typography sx={{ textTransform: "uppercase", ml: 2 }}>
                    khuyến mại - ưu đãi
                </Typography>
                <ul>
                    <li>Nhập mã EGANY thêm 5% đơn hàng Sao chép</li>
                    <li>Đồng giá Ship toàn quốc 25.000đ</li>
                    <li>Hỗ trợ 10.000 phí Ship cho đơn hàng từ 200.000đ</li>
                    <li>Miễn phí Ship cho đơn hàng từ 300.000đ</li>
                    <li>Đổi trả trong 30 ngày nếu sản phẩm lỗi bất kì</li>
                </ul>
            </Grid>
            <Box></Box>
        </div>
    );
};
export default ProductInfo;
