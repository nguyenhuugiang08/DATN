import { ToastContainer } from "react-toastify";
import RouterApp from "routes";

const App: React.FC = (): JSX.Element => {
    return (
        <>
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
            <RouterApp />
        </>
    );
};

export default App;
