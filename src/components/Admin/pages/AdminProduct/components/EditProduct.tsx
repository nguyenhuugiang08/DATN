import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import InputFieldDefaultValue from "customs/InputFieldDefaultValue";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toast } from "react-toastify";
import Roadmap from "components/Admin/components/Roadmap";
import { RootState, useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import productApi from "api/productApi";
import SelectFieldDefaultValue from "customs/SelectFieldDefaultValue";
import { getAllCategory } from "redux/categorySlice";
import MessageIcon from "@mui/icons-material/Message";
import TextareaField from "customs/TextareaField";
import CheckboxField from "customs/CheckboxField";
import FilterIcon from "@mui/icons-material/Filter";
import UploadFileField from "customs/UploadFileField";
import { Thumbnail } from "interfaces/interface";
import { getFileFromUrl } from "utilities/getFileFromUrl";

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

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        trademark: "",
        name: "",
        price: "",
        sizes: [] as string[],
        description: "",
        discount: "",
        quantity: "",
        thumbnails: [] as Thumbnail[],
        colors: [] as string[],
        categoryName: "",
    });

    const {
        trademark,
        name,
        price,
        sizes,
        description,
        discount,
        quantity,
        thumbnails,
        colors,
        categoryName,
    } = values;

    const listColors = ["Đỏ", "Cam", "Vàng", "Tím", "Xám", "Trắng", "Đen"];
    const listSizes = ["S", "M", "L"];

    const { products } = useSelector((state: RootState) => state.product);
    const { categories } = useSelector((state: RootState) => state.category);

    const dispatch = useAppDispatch();

    const classes = useStyles();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await productApi.getProductById(id);
                setValues({
                    ...values,
                    name: response.data?.name,
                    trademark: response.data?.trademark,
                    categoryName: response.data?.categoryName,
                    price: response.data?.price,
                    discount: response.data?.discount,
                    colors: response.data?.colors,
                    description: response.data?.description,
                    quantity: response.data?.quantity,
                    sizes: response.data?.sizes,
                    thumbnails: response.data?.thumbnails,
                });
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, [id]);

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
                    const listNameProducts = products
                        ?.filter((product) => product.name.toLowerCase() !== name?.toLowerCase())
                        .map((product) => product.name.toLowerCase());

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
        discount: yup.string(),
        // thumbnails: yup.mixed().test("fileSize", "The file is too large", (value) => {
        //     if (!value.length) return true; // attachment is optional
        //     return value[0].size <= 2000000;
        // }),
        colors: yup.array().of(yup.string()).min(1, "Vui lòng chọn ít nhất 1 màu"),
        categoryName: yup.string().required("Vui lòng chọn category cho product"),
    });

    const handleCancelEdit = () => {
        navigate("/admin/categories");
    };

    return (
        <div>
            <Box className={classes.containerAddBox}>
                <Typography className={classes.headingAddAlias}>edit product</Typography>
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
                                console.log(values);
                                const formData = new FormData();
                                for (let thumbnail of values.thumbnails) {
                                    const file = await getFileFromUrl(thumbnail.url, "example.jpg");
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

                                const updateProduct = async () => {
                                    try {
                                        await productApi.updateProduct({ id, formData });
                                    } catch (error) {
                                        console.log(error);
                                    }
                                };

                                toast
                                    .promise(updateProduct, {
                                        pending: "Đang chờ xử lý",
                                        success: "Cập nhật product thành công",
                                        error: {
                                            render({ data }) {
                                                const { response } = data;
                                                return `Cập nhật thất bại ${response.data?.message}`;
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
                                        {trademark && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name={"trademark"}
                                                    component={InputFieldDefaultValue}
                                                    label={"Trademark Name"}
                                                    currentValue={trademark}
                                                />
                                            </Grid>
                                        )}
                                        {name && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='name'
                                                    component={InputFieldDefaultValue}
                                                    label='Product Name'
                                                    currentValue={name}
                                                />
                                            </Grid>
                                        )}
                                        {categoryName && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='categoryName'
                                                    component={SelectFieldDefaultValue}
                                                    label='Category'
                                                    currentValue={categoryName}
                                                    listValues={categories}
                                                />
                                            </Grid>
                                        )}
                                        {sizes.length > 0 && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='sizes'
                                                    component={CheckboxField}
                                                    currentValue={sizes}
                                                    listValues={listSizes}
                                                />
                                            </Grid>
                                        )}
                                        {price && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='price'
                                                    component={InputFieldDefaultValue}
                                                    label='Price'
                                                    currentValue={price}
                                                />
                                            </Grid>
                                        )}
                                        {discount && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='discount'
                                                    component={InputFieldDefaultValue}
                                                    label='Discount'
                                                    currentValue={discount}
                                                />
                                            </Grid>
                                        )}
                                        {quantity && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='quantity'
                                                    component={InputFieldDefaultValue}
                                                    label='Quantity'
                                                    currentValue={quantity}
                                                />
                                            </Grid>
                                        )}
                                        {colors.length > 0 && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='colors'
                                                    component={CheckboxField}
                                                    currentValue={colors}
                                                    listValues={listColors}
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
                                    {description && (
                                        <Grid item xs={12}>
                                            <FastField
                                                name='description'
                                                component={TextareaField}
                                                currentValue={description}
                                            />
                                        </Grid>
                                    )}
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
                                    {thumbnails.length > 0 && (
                                        <Grid item xs={12}>
                                            <FastField
                                                name='thumbnails'
                                                component={UploadFileField}
                                                currentValue={thumbnails}
                                            />
                                        </Grid>
                                    )}

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

export default EditProduct;
