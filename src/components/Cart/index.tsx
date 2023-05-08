import { CartItem } from "interfaces/interface";
import "./Cart.scss";
import CloseIcon from "@mui/icons-material/Close";
import { formatPrice } from "utilities/formatPrice";
import { useAppDispatch } from "redux/store";
import { deleteItem } from "redux/cartSlice";

interface CartItemProps {
    cart: CartItem;
}

const Cart: React.FC<CartItemProps> = ({ cart }) => {
    const dispatch = useAppDispatch();

    const handleRemoveProduct = (item: CartItem) => {
        dispatch(deleteItem(item));
    };
    return (
        <div className='cart'>
            <div style={{ width: "100px", position: "relative" }}>
                <div
                    className='cart-img'
                    style={{ backgroundImage: `url(${cart.thumbnail})` }}
                ></div>
                <div className='cart-item-quantity'>{cart.quantity}</div>
            </div>
            <div style={{ textAlign: "left", marginLeft: "16px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className='cart-product-name'>{cart.productName}</span>
                    <CloseIcon fontSize='small' onClick={() => handleRemoveProduct(cart)} />
                </div>
                <div className='cart-color-size'>
                    {cart?.color?.colorName} / {cart?.size?.sizeName}
                </div>
                <div className='cart-price'>{formatPrice(cart.price)}đ</div>
                <div className='cart-quantity'>x{cart.quantity}</div>
            </div>
        </div>
    );
};
export default Cart;
