import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import InputFieldDefaultValue from "customs/InputFieldDefaultValue";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toast } from "react-toastify";
import Roadmap from "components/Admin/components/Roadmap";
import categoryApi from "api/categoryApi";
import SelectField from "customs/SelectFieldDefaultValue";
import { RootState, useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { getAllAlias } from "redux/aliasSlice";

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

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nameCategory, setNameCategory] = useState("");
    const [aliasName, setAliasName] = useState("");

    const { categories } = useSelector((state: RootState) => state.category);
    const { aliases } = useSelector((state: RootState) => state.alias);

    const dispatch = useAppDispatch();

    const classes = useStyles();

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await categoryApi.getCategoryById(id);
                setNameCategory(response.data?.name);
                setAliasName(response.data?.aliasName);
            } catch (error) {
                console.log(error);
            }
        };
        getCategory();
    }, [id]);


    useEffect(() => {
        dispatch(getAllAlias());
    }, [dispatch]);

    const initialValues = {
        name: "",
        aliasName: "",
    };

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required("Vui lòng nhập trường này")
            .test({
                test(value, ctx) {
                    const listNameCategories = categories
                        ?.filter((category) => category.name.toLowerCase() !== nameCategory?.toLowerCase())
                        .map((category) => category.name.toLowerCase());

                    if (listNameCategories.includes(value?.toLowerCase() as string)) {
                        return ctx.createError({
                            message: "Đã tồn tại tên category này. Vui lòng nhập lại!",
                        });
                    }
                    return true;
                },
            }),
    });

    const handleCancelEdit = () => {
        navigate("/admin/categories");
    };

    return (
        <div>
            <Box className={classes.containerAddBox}>
                <Typography className={classes.headingAddAlias}>add category</Typography>
                <Roadmap />
            </Box>
            <Box className={classes.boxContent}>
                <Grid container>
                    <Grid item xs={12} className={classes.headingAddAlias}>
                        <InfoOutlinedIcon fontSize='small' className={classes.positionIcon} /> about
                        category
                        <Box className={classes.line}></Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                const newValues = { id, ...values };
                                const updateCategory = async () => {
                                    try {
                                        await categoryApi.updateCategory(newValues);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                };

                                toast
                                    .promise(updateCategory, {
                                        pending: "Đang chờ xử lý",
                                        success: "Cập nhật category thành công",
                                        error: {
                                            render({ data }) {
                                                const { response } = data;
                                                return `Cập nhật thất bại ${response.data?.message}`;
                                            },
                                        },
                                    })
                                    .then(() => {
                                        navigate("/admin/categories");
                                    });
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    <Grid container spacing={4}>
                                        {aliasName && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name='aliasName'
                                                    component={SelectField}
                                                    label='Alias'
                                                    currentValue={aliasName}
                                                    listValues={aliases}
                                                />
                                            </Grid>
                                        )}

                                        {nameCategory && (
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name={"name"}
                                                    component={InputFieldDefaultValue}
                                                    label={"Category Name"}
                                                    currentValue={nameCategory}
                                                />
                                            </Grid>
                                        )}
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

export default EditCategory;
