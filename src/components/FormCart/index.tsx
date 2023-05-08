import { Button, Grid } from "@mui/material";
import { FastField, Field, Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "customs/InputField";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCommune, getConscious, getDistrict } from "redux/regionSlice";
import { RootState, useAppDispatch } from "redux/store";
import orderApi from "api/orderApi";
import useAxios from "hooks/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setDefaultCart } from "redux/cartSlice";

const FormCart = () => {
    const dispatch = useAppDispatch();
    const { consciouses, districts } = useSelector((state: RootState) => state.region);
    const { cart } = useSelector((state: RootState) => state.cart);
    const axiosRefresh = useAxios();
    const navigate = useNavigate();
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        address: "",
        conscious: "",
        district: "",
        note: "",
        products: "",
        sumMoney: "",
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required("Vui lòng nhập trường này."),
        phone: yup.string().required("Vui lòng nhập trường này."),
        email: yup.string().required("Vui lòng nhập trường này."),
        address: yup.string().required("Vui lòng nhập trường này."),
        conscious: yup.string().required("Vui lòng chọn Tỉnh/ Thành phố."),
        district: yup.string().required("Vui lòng chọn Quận/ Huyện."),
        note: yup.string(),
    });
    useEffect(() => {
        dispatch(getConscious());
    }, [dispatch]);

    const handleChangeConscious = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(getDistrict(event.target.value));
    };

    const handleChangeCommune = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCommune(event.target.value));
    };

    return (
        <Grid item xs={12}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    const formData = new FormData();

                    const province = consciouses?.find(
                        (_) => _.idProvince === values.conscious
                    )?.name;
                    const district = districts?.find((_) => _.idDistrict === values.district)?.name;
                    const products = cart.map((_) => {
                        return {
                            _id: _.productId,
                            name: _.productName,
                            price: _.price,
                            quantity: _.quantity,
                            total: Number(_.quantity) * Number(_.price),
                            thumbnail: _.thumbnail,
                            discount: _.discount,
                        };
                    });

                    const sumMoney = products.reduce((result, _) => {
                        return (
                            result +
                            (Number(_.quantity) * Number(_.price) * (100 - Number(_.discount))) / 100
                        );
                    }, 0);

                    formData.append("name", values.name);
                    formData.append("phone", values.phone);
                    formData.append("email", values.email);
                    formData.append("address", values.address);
                    formData.append("conscious", province);
                    formData.append("district", district);
                    formData.append("note", values.note);
                    products?.forEach((element) => {
                        formData.append("products", JSON.stringify(element));
                    });
                    formData.append("sumMoney", JSON.stringify(sumMoney));

                    toast
                        .promise(orderApi.createOrder({ formData }, axiosRefresh), {
                            pending: "Đang chờ xử lý",
                            success: "Đặt hàng thành công",
                            error: {
                                render({ data }) {
                                    const { response } = data;
                                    return `đặt hàng thất bại.`;
                                },
                            },
                        })
                        .then(() => navigate("/"))
                        .then(() => dispatch(setDefaultCart()));
                }}
            >
                {(formikProps) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FastField name='name' component={InputField} label='Họ tên' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FastField
                                    name='phone'
                                    component={InputField}
                                    label='Số điện thoại'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FastField
                                    name='email'
                                    component={InputField}
                                    label='Email'
                                    placeholder='Example@gmail.com'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FastField name='address' component={InputField} label='Địa chỉ' />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name='conscious'
                                    as='select'
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        handleChangeConscious(e);
                                        formikProps.setFieldValue("conscious", e.target.value);
                                    }}
                                    className='region-field'
                                    style={{
                                        borderColor:
                                            formikProps.errors.conscious &&
                                            formikProps.touched.conscious
                                                ? "#d32f2f"
                                                : "#cccccc",
                                    }}
                                >
                                    <option value=''>Chọn tỉnh/ thành phố</option>
                                    {consciouses.map((option: any) => (
                                        <option key={option.idProvince} value={option.idProvince}>
                                            {option.name}
                                        </option>
                                    ))}
                                </Field>
                                {formikProps.errors.conscious && formikProps.touched.conscious && (
                                    <div className='select-error'>
                                        {formikProps.errors.conscious}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name='district'
                                    as='select'
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        handleChangeCommune(e);
                                        formikProps.setFieldValue("district", e.target.value);
                                    }}
                                    className='region-field'
                                    style={{
                                        borderColor:
                                            formikProps.errors.conscious &&
                                            formikProps.touched.conscious
                                                ? "#d32f2f"
                                                : "#cccccc",
                                    }}
                                >
                                    <option value=''>Chọn quận/ huyện</option>
                                    {districts.map((option: any) => (
                                        <option key={option.idDistrict} value={option.idDistrict}>
                                            {option.name}
                                        </option>
                                    ))}
                                </Field>
                                {formikProps.errors.district && formikProps.touched.district && (
                                    <div className='select-error'>
                                        {formikProps.errors.district}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <FastField
                                    name='note'
                                    component={InputField}
                                    label='Ghi chú'
                                    placeholder='Ghi chú thêm(Ví dụ: giao hàng giờ hành chính)'
                                />
                            </Grid>
                        </Grid>
                        <Button
                            sx={{
                                width: "300px",
                                backgroundColor: "#333",
                                marginBottom: "32px",
                                marginTop: "20px",
                                float: "right",
                            }}
                            variant='contained'
                            type='submit'
                        >
                            Thanh toán {}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Grid>
    );
};
export default FormCart;
