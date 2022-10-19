import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "customs/InputField";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toast } from "react-toastify";
import Roadmap from "components/Admin/components/Roadmap";
import { RootState, useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import productApi from "api/productApi";
import { getAllCategory } from "redux/categorySlice";
import MessageIcon from "@mui/icons-material/Message";
import TextareaField from "customs/TextareaField";
import CheckboxField from "customs/CheckboxField";
import FilterIcon from "@mui/icons-material/Filter";
import UploadFileField from "customs/UploadFileField";
import { Thumbnail } from "interfaces/interface";
import CustomSelectField from "customs/SelectField";
import { getFileFromUrl } from "utilities/getFileFromUrl";
import useAxios from "hooks/useAxios";

const useStyles = makeStyles({
    containerAddBox: {
        height: "67px",
        margin: "0 -20px 10px",
        padding: "13px 20px",
        display: "flex",
        justifyContent: "space-between",
    },
    headingAddAlias: {
        fontSize: "18px !important",
        lineHeight: "26px !important",
        textTransform: "capitalize",
        color: "#212121",
        paddingTop: "6px",
    },
    boxContent: {
        background: "#fff",
        marginBottom: "20px",
        border: "none",
        borderRadius: "2px",
        boxShadow: "none",
        padding: "15px 15px 20px",
        marginLeft: "-5px",
        marginRight: "-5px",
    },
    saveBtn: {
        backgroundColor: "#2ecd99 !important",
    },
    cancelBtn: {
        backgroundColor: "#f0c541 !important",
    },
    positionIcon: {
        position: "relative",
        top: "3px",
    },
    line: {
        borderTop: "1px solid #dedede",
        marginTop: "10px",
        marginBottom: "35px",
    },
});

const CreateProduct = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        sizes: [] as string[],
        colors: [] as string[],
    });

    useLayoutEffect(() => {
        setValues({ ...values, sizes: ["S"], colors: ["Đỏ"] });
    }, []);

    const listColors = ["Đỏ", "Cam", "Vàng", "Tím", "Xám", "Trắng", "Đen"];
    const listSizes = ["S", "M", "L"];

    const { products } = useSelector((state: RootState) => state.product);
    const { categories } = useSelector((state: RootState) => state.category);

    const dispatch = useAppDispatch();
    const axiosRefresh = useAxios();

    const classes = useStyles();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const initialValues = {
        trademark: "",
        name: "",
        price: "",
        sizes: [] as string[],
        description: "",
        discount: "",
        quantity: "",
        thumbnails: [] as Thumbnail[],
        colors: [],
        categoryName: "",
    };

    const validationSchema = yup.object().shape({
        trademark: yup.string().required("Vui lòng nhập trường này"),
        name: yup
            .string()
            .required("Vui lòng nhập trường này")
            .test({
                test(value, ctx) {
                    const listNameProducts = products?.map((product) => product.name.toLowerCase());

                    if (listNameProducts.includes(value?.toLowerCase() as string)) {
                        return ctx.createError({
                            message: "Đã tồn tại tên product này. Vui lòng nhập lại!",
                        });
                    }
                    return true;
                },
            }),
        price: yup.string().required("Vui lòng nhập trường này"),
        sizes: yup
            .array()
            .of(yup.string().required())
            .min(1, "Vui lòng chọn size cho product")
            .nullable(),
        description: yup.string().required("Vui lòng nhập trường này"),
        quantity: yup.string().required("Vui lòng nhập trường này"),
        discount: yup.string().required("Vui lòng nhập trường này"),
        thumbnails: yup.array().of(
            yup.mixed().test("fileSize", "The file is too large", (value) => {
                if (!value.length) return true; // attachment is optional
                return value[0].size <= 2000000;
            })
        ),
        colors: yup.array().of(yup.string()).min(1, "Vui lòng chọn ít nhất 1 màu"),
        categoryName: yup.string().required("Vui lòng chọn category cho product"),
    });

    const handleCancelEdit = () => {
        navigate("/admin/products");
    };

    return (
        <div>
            <Box className={classes.containerAddBox}>
                <Typography className={classes.headingAddAlias}>create product</Typography>
                <Roadmap />
            </Box>
            <Box className={classes.boxContent}>
                <Grid container>
                    <Grid item xs={12} className={classes.headingAddAlias}>
                        <InfoOutlinedIcon fontSize='small' className={classes.positionIcon} /> about
                        product
                        <Box className={classes.line}></Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                const formData = new FormData();
                                console.log(values.thumbnails);
                                for (let thumbnail of values.thumbnails) {
                                    const file = await getFileFromUrl(thumbnail.url, "images");
                                    formData.append("thumbnails", file);
                                }
                                formData.append("trademark", values.trademark);
                                formData.append("name", values.name);
                                formData.append("categoryName", values.categoryName);
                                formData.append("description", values.description);
                                formData.append("discount", values.discount);
                                formData.append("price", values.price);
                                formData.append("quantity", values.quantity);
                                values.colors?.forEach((color) => formData.append("colors", color));
                                values.sizes?.forEach((size) => formData.append("sizes", size));

                                const createProduct = async () => {
                                    try {
                                        await productApi.createProduct({ formData }, axiosRefresh);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                };

                                toast
                                    .promise(createProduct, {
                                        pending: "Đang chờ xử lý",
                                        success: "Tạo mới product thành công",
                                        error: {
                                            render({ data }) {
                                                const { response } = data;
                                                return `Tạo mới thất bại ${response.data?.message}`;
                                            },
                                        },
                                    })
                                    .then(() => {
                                        navigate("/admin/products");
                                    });
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} md={6}>
                                            <FastField
                                                name={"trademark"}
                                                component={InputField}
                                                label={"Trademark Name"}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FastField
                                                name='name'
                                                component={InputField}
                                                label='Product Name'
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FastField
                                                name='categoryName'
                                                component={CustomSelectField}
                                                label='Category'
                                                listValues={categories}
                                            />
                                        </Grid>
                                        {values.sizes?.length > 0 && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='sizes'
                                                    component={CheckboxField}
                                                    currentValue={values.sizes}
                                                    listValues={listSizes}
                                                    label='Sizes'
                                                />
                                            </Grid>
                                        )}
                                        <Grid item xs={12} md={6}>
                                            <FastField
                                                name='price'
                                                component={InputField}
                                                label='Price'
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FastField
                                                name='discount'
                                                component={InputField}
                                                label='Discount'
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FastField
                                                name='quantity'
                                                component={InputField}
                                                label='Quantity'
                                            />
                                        </Grid>
                                        {values.colors?.length > 0 && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='colors'
                                                    component={CheckboxField}
                                                    currentValue={values.colors}
                                                    listValues={listColors}
                                                    label='Colors'
                                                />
                                            </Grid>
                                        )}
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        className={classes.headingAddAlias}
                                        sx={{ marginTop: "80px" }}
                                    >
                                        <MessageIcon
                                            fontSize='small'
                                            className={classes.positionIcon}
                                        />{" "}
                                        product description
                                        <Box className={classes.line}></Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name='description'
                                            component={TextareaField}
                                            currentValue={""}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        className={classes.headingAddAlias}
                                        sx={{ marginTop: "80px" }}
                                    >
                                        <FilterIcon
                                            fontSize='small'
                                            className={classes.positionIcon}
                                        />{" "}
                                        upload image
                                        <Box className={classes.line}></Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name='thumbnails'
                                            component={UploadFileField}
                                            currentValue={[] as Thumbnail[]}
                                        />
                                    </Grid>

                                    <Button
                                        type='submit'
                                        variant='contained'
                                        className={classes.saveBtn}
                                        sx={{
                                            textTransform: "capitalize !important",
                                            marginTop: "35px",
                                        }}
                                    >
                                        <CheckIcon fontSize='small' sx={{ mr: 1 }} /> Save
                                    </Button>
                                    <Button
                                        variant='contained'
                                        className={classes.cancelBtn}
                                        sx={{
                                            textTransform: "capitalize !important",
                                            ml: 2,
                                            marginTop: "35px",
                                        }}
                                        onClick={handleCancelEdit}
                                    >
                                        cancel
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default CreateProduct;
