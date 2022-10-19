import { Button, Container, Grid } from "@mui/material";
import { FastField, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "customs/InputField";
import * as yup from "yup";
import "./forgotPassword.scss";
import userApi from "api/userApi";

const ForgotPassword: React.FC = () => {
    const initialValues = {
        email: "",
    };

    const validationSchema = yup.object().shape({
        email: yup.string().required("Vui lòng nhập trường này").email("Trường này phải là email"),
    });

    const navigate = useNavigate();

    return (
        <div className='login'>
            <div className='login-location'>
                <Container maxWidth='lg'>
                    <Grid>
                        <Link to='/' className='login-location-link'>
                            Trang chủ
                        </Link>
                        <span>&nbsp;/&nbsp;</span>
                        <span>Đăng nhập tài khoản</span>
                    </Grid>
                </Container>
            </div>
            <Container className='login-main'>
                <Grid className='login-main-title'>đăng nhập tài khoản</Grid>
                <Grid className='login-main-register'>
                    <span>Bạn chưa có tài khoản</span>
                    <span>&nbsp;?&nbsp;</span>
                    <Link to='/account/register' className='login-main-register__link'>
                        Đăng ký tại đây
                    </Link>
                </Grid>
                <Grid container>
                    <Grid item className='login-form' xs={12} md={6} lg={6}>
                        <div className='forgot-password-title'>ĐẶT LẠI MẬT KHẨU</div>
                        <div className='forgot-password-paragraph'>
                            Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                toast
                                    .promise(userApi.forgotPassword(values), {
                                        pending: "Đang chờ xử lý",
                                        success:
                                            "Gửi yêu cầu thành công. Vui lòng kiểm tra email của bạn để reset password",
                                        error: {
                                            render({ data }) {
                                                const { response } = data;
                                                return `Gửi yêu cầu thất bại ${response.data?.message}`;
                                            },
                                        },
                                    })
                                    .then(() => {
                                        navigate("/account/login");
                                    });
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    <FastField
                                        name={"email"}
                                        component={InputField}
                                        label={"Email"}
                                        placeholder={"Enter your email..."}
                                    />
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='warning'
                                        className='login-btn reset-btn'
                                    >
                                        LẤY LẠI MẬT KHẨU
                                    </Button>
                                    <Link to='/account/login' className='back-btn'>
                                        Quay lại
                                    </Link>
                                    <div className='login-social'>
                                        <span className='login-social-title'>
                                            Hoặc đăng nhập bằng
                                        </span>
                                        <div className='login-social-content'>
                                            <img
                                                className='login-social-content__img'
                                                src='https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg'
                                                alt='logo-facebook'
                                            />
                                            <img
                                                className='login-social-content__img'
                                                src='https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg'
                                                alt='logo-google'
                                            />
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default ForgotPassword;
