import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../../redux/productSlice";
import { useAppDispatch } from "../../../../redux/store";

const ProductDetail: React.FC = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    return <div>Product detail</div>;
};

export default ProductDetail;
