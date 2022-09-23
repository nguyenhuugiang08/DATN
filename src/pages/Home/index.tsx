import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authApi, { DataLogin } from "../../api/authApi";
import { User } from "../../interfaces/interface";
import { login } from "../../redux/auth";

const Home: FC = () => {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<User>({
        name: "",
        surname: "",
        email: "",
        phone: "",
        accessToken: "",
        role: "",
    });

    const { name, surname, email, phone, accessToken, role } = userInfo;

    const dispatch = useDispatch();

    const dataLogin: DataLogin = {
        email: "nguyenhuugiangtb08012001@gmail.com",
        password: "nguyenhuugiang0808",
    };

    useEffect(() => {
        const handleLogin = async () => {
            try {
                setLoading(true);
                const res = await authApi.login(dataLogin);
                setUserInfo({ ...res.data });
                dispatch(login({ ...res.data }));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        handleLogin();
    }, []);

    return (
        <div>
            Home page
            {loading ? (
                <div>Loading....</div>
            ) : (
                <div>
                    <ul>
                        <li>Họ và tên: {`${surname} ${name}`}</li>
                        <li>Email: {`${email}`}</li>
                        <li>SĐT: {`${phone}`}</li>
                        <li>AccessToken: {`${accessToken}`}</li>
                        <li>AccessToken: {`${role}`}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
