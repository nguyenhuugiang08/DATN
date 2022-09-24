import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductInterface } from "../../interfaces/interface";
import { getAllProducts } from "../../redux/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";

const Product: React.FC = () => {
    const { products } = useSelector((state: RootState) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <div>
            Product
            {products?.map((product: ProductInterface) => (
                <div key={product._id}>
                    <ul>
                        <li>id: {`${product._id}`}</li>
                        <li>id: {`${product.trademark}`}</li>
                        <li>id: {`${product.name}`}</li>
                        <li>id: {`${product.price}`}</li>
                        <li>id: {`${product.sizes}`}</li>
                        <li>id: {`${product.description}`}</li>
                        <li>id: {`${product.colors}`}</li>
                        <li>id: {`${product.discount}`}</li>
                        <li>id: {`${product.quantity}`}</li>
                        <li>id: {`${product.thumbnails}`}</li>
                        <li>id: {`${product.categoryId}`}</li>
                    </ul>
                    <img
                        src={product?.thumbnails[1].url}
                        alt='thumbnail'
                        style={{
                            width: "300px",
                            height: "300px",
                            objectFit: "contain",
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default Product;
