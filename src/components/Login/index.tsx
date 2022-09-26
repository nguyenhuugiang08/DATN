import { Formik, Form, FastField } from "formik";
import CustomField from "customs/CustomFieled";
import { Button, Container, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useAppDispatch } from "redux/store";
import { loginUser } from "redux/authSlice";
import * as yup from "yup";
import { unwrapResult } from "@reduxjs/toolkit";

const Login: React.FC = () => {
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = yup.object().shape({
        email: yup.string().required("Vui lòng nhập trường này").email("Trường này phải là email"),
        password: yup
            .string()
            .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
            .required("Vui lòng nhập trường này"),
    });

    const dispatch = useAppDispatch();
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
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                const result = await dispatch(loginUser(values));
                                unwrapResult(result);
                                navigate("/");
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    <FastField
                                        name={"email"}
                                        component={CustomField}
                                        label={"Email"}
                                        placeholder={"Enter your email..."}
                                    />

                                    <FastField
                                        name={"password"}
                                        component={CustomField}
                                        type={"password"}
                                        label={"Mật khẩu"}
                                        placeholder={"Enter your password..."}
                                    />

                                    <div className='login-form-forgot'>
                                        Quên mật khẩu<span>?&nbsp;</span>
                                        <span>Nhấn vào </span>
                                        <Link
                                            to='/account/forgot-password'
                                            className='login-main-register__link'
                                        >
                                            đây
                                        </Link>
                                    </div>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='warning'
                                        className='login-btn'
                                    >
                                        ĐĂNG NHẬP
                                    </Button>
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

export default Login;
