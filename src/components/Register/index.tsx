import { Button, Container, Grid } from "@mui/material";
import CustomField from "customs/CustomFieled";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FastField, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import authApi, { DataRegister } from "api/authApi";

const Register: React.FC = () => {
    const initialValues: DataRegister = {
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: "",
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required("Vui lòng nhập trường này"),
        surname: yup.string().required("Vui lòng nhập trường này"),
        email: yup.string().required("Vui lòng nhập trường này").email("Trường này phải là email"),
        password: yup
            .string()
            .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
            .required("Vui lòng nhập trường này"),
        phone: yup.number().required("Vui lòng nhập trường này"),
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
                        <span>Đăng ký tài khoản</span>
                    </Grid>
                </Container>
            </div>
            <Container className='login-main'>
                <Grid className='login-main-title'>đăng ký tài khoản</Grid>
                <Grid className='login-main-register'>
                    <span>Bạn đã có tài khoản</span>
                    <span>&nbsp;?&nbsp;</span>
                    <Link to='/account/login' className='login-main-register__link'>
                        Đăng nhập tại đây
                    </Link>
                </Grid>
                <Grid container>
                    <Grid item className='login-form' xs={12} md={6} lg={6}>
                        <Grid2 xs={12} md={12} lg={12} lgOffset={3}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={async (values: DataRegister) => {
                                    const result = await authApi.register(values);
                                    const status = `${result.status}`;
                                    if (status === "success") navigate("/account/login");
                                }}
                            >
                                {(formikProps) => (
                                    <Form>
                                        <FastField
                                            name={"surname"}
                                            component={CustomField}
                                            label={"Họ"}
                                            placeholder={"Họ"}
                                        />

                                        <FastField
                                            name={"name"}
                                            component={CustomField}
                                            label={"Tên"}
                                            placeholder={"Tên"}
                                        />

                                        <FastField
                                            name={"phone"}
                                            component={CustomField}
                                            label={"Số điện thoại"}
                                            placeholder={"Số điện thoại"}
                                        />

                                        <FastField
                                            name={"email"}
                                            component={CustomField}
                                            label={"Email"}
                                            placeholder={"Email"}
                                        />

                                        <FastField
                                            name={"password"}
                                            component={CustomField}
                                            type={"password"}
                                            label={"Mật khẩu"}
                                            placeholder={"Mật khẩu"}
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
                        </Grid2>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Register;
