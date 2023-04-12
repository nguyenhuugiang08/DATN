import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Product } from "../../interfaces/interface";
import { getProductByFilters } from "../../redux/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";

const Products: React.FC = () => {
    const { products } = useSelector((state: RootState) => state.product);
    const dispatch = useAppDispatch();

    const productRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    console.log(productRef?.current?.style);

    useEffect(() => {
        dispatch(getProductByFilters());
    }, [dispatch]);

    return <div ref={productRef}>Product</div>;
};

export default Products;    
