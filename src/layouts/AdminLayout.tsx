import HeaderAdmin from "components/Admin/components/HeaderAdmin";
import NavbarAdmin from "components/Admin/components/NavbarAdmin";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex" }}>
            <NavbarAdmin />
            <div style={{ flex: 1 }}>
                <HeaderAdmin />
                <div
                    style={{
                        padding: "20px 20px 70px",
                        backgroundColor: "#edf1f5",
                        minHeight: "calc(100vh - 72px)",
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default AdminLayout;
