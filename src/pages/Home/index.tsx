import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { DataLogin } from "../../api/authApi";
import { User } from "../../interfaces/interface";
import { loginUser } from "../../redux/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";

const Home: FC = () => {
    const [loading, setLoading] = useState(false);
    const { entities } = useSelector((state: RootState) => state.auth);

    const dispatch = useAppDispatch();

    const dataLogin: DataLogin = {
        email: "nguyenhuugiangtb08012001@gmail.com",
        password: "nguyenhuugiang0808",
    };

    const handleLogin = async () => {
        setLoading(true);
        await dispatch(loginUser(dataLogin));
        setLoading(false);
    };

    return (
        <div>
            Home page
            <button onClick={handleLogin}>Login</button>
            {loading ? (
                <div>Loading....</div>
            ) : (
                entities?.map((user: User) => (
                    <div>
                        <ul>
                            <li>Họ và tên: {`${user.surname} ${user.name}`}</li>
                            <li>Email: {`${user.email}`}</li>
                            <li>SĐT: {`${user.phone}`}</li>
                            <li>AccessToken: {`${user.accessToken}`}</li>
                            <li>Role: {`${user.role}`}</li>
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
