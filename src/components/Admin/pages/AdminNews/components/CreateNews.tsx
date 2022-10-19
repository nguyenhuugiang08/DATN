import { useEffect } from "react";
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
import MessageIcon from "@mui/icons-material/Message";
import TextareaField from "customs/TextareaField";
import FilterIcon from "@mui/icons-material/Filter";
import UploadFileField from "customs/UploadFileField";
import { Picture } from "interfaces/interface";
import { getFileFromUrl } from "utilities/getFileFromUrl";
import useAxios from "hooks/useAxios";
import newsApi from "api/newsApi";
import { getAllNews } from "redux/newsSlice";

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

const CreateNews: React.FC = () => {
    const navigate = useNavigate();

    const { listNews } = useSelector((state: RootState) => state.news);

    const dispatch = useAppDispatch();
    const axiosRefresh = useAxios();

    const classes = useStyles();

    useEffect(() => {
        dispatch(getAllNews());
    }, [dispatch]);

    const initialValues = {
        title: "",
        content: "",
        pictures: [] as Picture[],
    };

    const validationSchema = yup.object().shape({
        title: yup
            .string()
            .required("Vui lòng nhập trường này")
            .test({
                test(value, ctx) {
                    const listTitleNews = listNews?.map((news) => news.title.toLowerCase());
                    console.log(listTitleNews);

                    if (listTitleNews.includes(value?.toLowerCase() as string)) {
                        return ctx.createError({
                            message: "Đã tồn tại title này. Vui lòng nhập lại!",
                        });
                    }
                    return true;
                },
            }),
        content: yup.string().required("Vui lòng nhập trường này"),
        pictures: yup.array().of(
            yup.mixed().test("fileSize", "The file is too large", (value) => {
                if (!value.length) return true; // attachment is optional
                return value[0].size <= 2000000;
            })
        ),
    });

    const handleCancelEdit = () => {
        navigate("/admin/news");
    };

    return (
        <div>
            <Box className={classes.containerAddBox}>
                <Typography className={classes.headingAddAlias}>edit news</Typography>
                <Roadmap />
            </Box>
            <Box className={classes.boxContent}>
                <Grid container>
                    <Grid item xs={12} className={classes.headingAddAlias}>
                        <InfoOutlinedIcon fontSize='small' className={classes.positionIcon} /> about
                        news
                        <Box className={classes.line}></Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                console.log(values);
                                const formData = new FormData();
                                for (let picture of values.pictures) {
                                    const file = await getFileFromUrl(picture.url, "example.jpg");
                                    formData.append("pictures", file);
                                }
                                formData.append("title", values.title);
                                formData.append("content", values.content);

                                const createNews = async () => {
                                    try {
                                        await newsApi.createNews({ formData }, axiosRefresh);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                };

                                toast
                                    .promise(createNews, {
                                        pending: "Đang chờ xử lý",
                                        success: "Cập nhật news thành công",
                                        error: {
                                            render({ data }) {
                                                const { response } = data;
                                                return `Cập nhật thất bại ${response.data?.message}`;
                                            },
                                        },
                                    })
                                    .then(() => {
                                        navigate("/admin/news");
                                    });
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} md={6}>
                                            <FastField
                                                name={"title"}
                                                component={InputField}
                                                label={"Title News"}
                                            />
                                        </Grid>
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
                                        content news
                                        <Box className={classes.line}></Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name='content'
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
                                            name='pictures'
                                            component={UploadFileField}
                                            currentValue={[] as Picture[]}
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

export default CreateNews;
