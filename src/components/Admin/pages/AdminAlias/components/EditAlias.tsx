import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Grid, Button, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import InputFieldDefaultValue from "customs/InputFieldDefaultValue";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import aliasApi from "api/aliasApi";
import { toast } from "react-toastify";
import Roadmap from "components/Admin/components/Roadmap";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const useStyles = makeStyles((theme: Theme) => createStyles({
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
}));

const EditAlias = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nameAlias, setNameAlias] = useState("");

    const classes = useStyles();

    const { aliases } = useSelector((state: RootState) => state.alias);

    useEffect(() => {
        const getAlias = async () => {
            try {
                const response = await aliasApi.getAliasById(id);
                setNameAlias(response.data?.name);
            } catch (error) {
                console.log(error);
            }
        };
        getAlias();
    }, [id]);

    const initialValues = {
        name: "",
    };

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required("Vui lòng nhập trường này")
            .test({
                test(value, ctx) {
                    const listAliasName = aliases
                        ?.filter((alias) => alias.name.toLowerCase() !== nameAlias?.toLowerCase())
                        .map((alias) => alias.name.toLowerCase());

                    if (listAliasName.includes(value?.toLowerCase() as string)) {
                        return ctx.createError({
                            message: "Đã tồn tại tên alias này. Vui lòng nhập lại!",
                        });
                    }
                    return true;
                },
            }),
    });

    const handleCancelEdit = () => {
        navigate("/admin/alias");
    };

    return (
        <div>
            <Box className={classes.containerAddBox}>
                <Typography className={classes.headingAddAlias}>add-aliases</Typography>
                <Roadmap />
            </Box>
            <Box className={classes.boxContent}>
                <Grid container>
                    <Grid item xs={12} className={classes.headingAddAlias}>
                        <InfoOutlinedIcon fontSize='small' className={classes.positionIcon} /> about
                        alias
                        <Box className={classes.line}></Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                const newValues = { id, ...values };
                                const updateAlias = async () => {
                                    try {
                                        await aliasApi.updateAlias(newValues);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                };

                                toast
                                    .promise(updateAlias, {
                                        pending: "Đang chờ xử lý",
                                        success: "Cập nhật alias thành công",
                                        error: {
                                            render({ data }) {
                                                const { response } = data;
                                                return `Cập nhật thất bại ${response.data?.message}`;
                                            },
                                        },
                                    })
                                    .then(() => {
                                        navigate("/admin/alias");
                                    });
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    {nameAlias && (
                                        <FastField
                                            name={"name"}
                                            component={InputFieldDefaultValue}
                                            label={"Name"}
                                            currentValue={nameAlias}
                                        />
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

export default EditAlias;
