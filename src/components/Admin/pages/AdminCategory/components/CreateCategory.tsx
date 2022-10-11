import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InputField from "customs/InputField";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Roadmap from "components/Admin/components/Roadmap";
import categoryApi from "api/categoryApi";
import SelectField from "customs/SelectField";

const useStyles = makeStyles({
    containerAddBox: {
        height: "67px",
        margin: "0 -20px 10px",
        padding: "13px 20px",
        display: "flex",
        justifyContent: "space-between",
    },
    headingAdd: {
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

const CreateCategory = () => {
    const navigate = useNavigate();

    const classes = useStyles();

    const { categories } = useSelector((state: RootState) => state.category);

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
                    const listNameCategories = categories?.map((category) =>
                        category.name.toLowerCase()
                    );

                    if (listNameCategories.includes(value?.toLowerCase() as string)) {
                        return ctx.createError({
                            message: "Đã tồn tại tên category này. Vui lòng nhập lại!",
                        });
                    }
                    return true;
                },
            }),
        aliasName: yup.string().required("Vui lòng chọn tên alias"),
    });

    const handleCancelCreate = () => {
        navigate("/admin/categories");
    };

    return (
        <div>
            <Box className={classes.containerAddBox}>
                <Typography className={classes.headingAdd}>Create aliases</Typography>
                <Roadmap />
            </Box>
            <Box className={classes.boxContent}>
                <Grid container>
                    <Grid item xs={12} className={classes.headingAdd}>
                        <InfoOutlinedIcon fontSize='small' className={classes.positionIcon} /> about
                        alias
                        <Box className={classes.line}></Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                const createCategory = async () => {
                                    try {
                                        await categoryApi.createCategory(values);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                };
                                toast
                                    .promise(createCategory, {
                                        pending: "Đang chờ xử lý",
                                        success: "Tạo category mới thành công",
                                        error: {
                                            render({ data }) {
                                                const { response } = data;
                                                return `Tạo mới thất bại ${response.data?.message}`;
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
                                        <Grid item xs={12} md={6}>
                                            <FastField
                                                name='aliasName'
                                                component={SelectField}
                                                label='Alias Name'
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <FastField
                                                name={"name"}
                                                component={InputField}
                                                label={"Category Name"}
                                            />
                                        </Grid>
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
                                        onClick={handleCancelCreate}
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

export default CreateCategory;
