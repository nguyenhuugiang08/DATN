import { Formik, Form, FastField } from "formik";
import { Button, Container, Grid, Stack } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputField from "customs/InputField";
import { toast, ToastContainer } from "react-toastify";
import "./resetPassword.scss";
import userApi from "api/userApi";
import qs from "query-string";

const ResetPassword: React.FC = () => {
    const initialValues = {
        newPassword: "",
        passwordConfirm: "",
    };

    const validationSchema = yup.object().shape({
        newPassword: yup
            .string()
            .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
            .required("Vui lòng nhập trường này"),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref("newPassword"), null], "Xác nhận mật khẩu không khớp")
            .required("Vui lòng nhập trường này"),
    });

    const navigate = useNavigate();

    const { search } = useLocation();
    const { query } = qs.parseUrl(search);
    const { email } = query;

    return (
        <div className='login'>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className='login-location'>
                <Container maxWidth='lg'>
                    <Grid>
                        <Link to='/' className='login-location-link'>
                            Trang chủ
                        </Link>
                        <span>&nbsp;/&nbsp;</span>
                        <span>Đổi mật khẩu</span>
                    </Grid>
                </Container>
            </div>
            <Container className='login-main'>
                <Grid className='login-main-title'>lấy lại mật khẩu</Grid>
                <Grid className='login-main-register'>
                    <span>Nhập mật khẩu mới</span>
                </Grid>
                <Grid container>
                    <Grid item className='login-form' xs={12} md={6} lg={6}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                const { newPassword } = values;
                                await toast.promise(userApi.resetPassword({ newPassword, email }), {
                                    pending: "Đang xử lý.",
                                    success: "Cập nhật mật khẩu thành công.",
                                    error: {
                                        render({ data }) {
                                            const { response } = data;
                                            return `Cập nhật mật khẩu thất bại ${response.message}`;
                                        },
                                    },
                                });
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    <FastField
                                        name={"newPassword"}
                                        component={InputField}
                                        type={"password"}
                                        label={"Mật khẩu"}
                                    />

                                    <FastField
                                        name={"passwordConfirm"}
                                        component={InputField}
                                        type={"password"}
                                        label={"Xác nhận mật khẩu"}
                                    />

                                    <Stack spacing={2} direction='row' className='stack-btn'>
                                        <Button type='submit' variant='contained' color='warning'>
                                            ĐẶT LẠI MẬT KHẨU
                                        </Button>

                                        <Button variant='contained' color='error'>
                                            <Link
                                                to='/account/login'
                                                className='reset-password-cancel'
                                            >
                                                HỦY
                                            </Link>
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default ResetPassword;
