import { Grid } from "@mui/material";
import { FastField, Field, Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "customs/InputField";
import { useEffect, useRef, useState } from "react";
import regionApi from "api/regionApi";
import CustomSelectField from "customs/SelectField";
import { RootState, useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { getCommune, getConscious, getDistrict } from "redux/regionSlice";

const FormCart = () => {
    const dispatch = useAppDispatch();
    const { consciouses, districts, communes } = useSelector((state: RootState) => state.region);

    const initialValues = {
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        conscious: "",
        district: "",
        commune: "",
        note: "",
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required("Vui lòng nhập trường này."),
        phoneNumber: yup.string().required("Vui lòng nhập trường này."),
        email: yup.string().required("Vui lòng nhập trường này."),
        address: yup.string().required("Vui lòng nhập trường này."),
        conscious: yup.string().required("Vui lòng chọn Tỉnh/ Thành phố."),
        district: yup.string().required("Vui lòng chọn Quận/ Huyện."),
        commune: yup.string().required("Vui lòng chọn Phường/ Xã."),
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

                    formData.append("name", values.name);
                    formData.append("phoneNumber", values.phoneNumber);
                    formData.append("email", values.email);
                    formData.append("address", values.address);
                    formData.append("conscious", values.conscious);
                    formData.append("district", values.district);
                    formData.append("commune", values.commune);
                    formData.append("note", values.note);

                    // toast
                    //     .promise(createProduct, {
                    //         pending: "Đang chờ xử lý",
                    //         success: "Tạo mới product thành công",
                    //         error: {
                    //             render({ data }) {
                    //                 const { response } = data;
                    //                 return `Tạo mới thất bại ${response.data?.message}`;
                    //             },
                    //         },
                    //     })
                    //     .then(() => {
                    //         navigate("/admin/products");
                    //     });
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
                                    name='phoneNumber'
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
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
                                <Field
                                    name='commune'
                                    as='select'
                                    className='region-field'
                                    style={{
                                        borderColor:
                                            formikProps.errors.conscious &&
                                            formikProps.touched.conscious
                                                ? "#d32f2f"
                                                : "#cccccc",
                                    }}
                                >
                                    <option value=''>Chọn xã/ phường</option>
                                    {communes?.map((option: any) => (
                                        <option key={option.idCommune} value={option.idCommune}>
                                            {option.name}
                                        </option>
                                    ))}
                                </Field>
                                {formikProps.errors.commune && formikProps.touched.commune && (
                                    <div className='select-error'>{formikProps.errors.commune}</div>
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
                        <button>Thanh toán {}</button>
                    </Form>
                )}
            </Formik>
        </Grid>
    );
};
export default FormCart;
