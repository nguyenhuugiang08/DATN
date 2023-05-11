import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useAxios from "hooks/useAxios";
import { getUsers } from "redux/authSlice";
import { getOrder } from "redux/orderSlice";

const useStyles = makeStyles({
    containerBox: {
        height: "67px",
        margin: "0 -20px 10px",
        padding: "13px 20px",
        display: "flex",
        justifyContent: "space-between",
    },
    headingAlias: {
        fontSize: "18px !important",
        lineHeight: "26px !important",
        textTransform: "capitalize",
        color: "#212121",
        paddingTop: "6px",
    },
    linkAddAlias: {
        textDecoration: "none",
        color: "#fff",
        alignItems: "center",
        display: "flex",
        textTransform: "capitalize",
    },
    linkTrash: {
        textDecoration: "none",
        color: "#2f80ed",
        fontSize: "14px",
        marginLeft: "16px",
    },
    thumbnailProduct: {
        width: "80px",
        height: "100px",
        margin: "16px",
        objectFit: "contain",
    },
    titleForm: {
        fontWeight: "700 !important",
        color: "var(--primary-color)",
        fontSize: "24px !important",
    },
});

const AdminOrder = () => {
    const dispatch = useAppDispatch();
    const { orders } = useSelector((state: RootState) => state.order);

    const classes = useStyles();
    const axiosRefresh = useAxios();

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Thông tin giao hàng",
            width: 300,
            valueGetter({ row }) {
                return {
                    name: row.name,
                    phone: row.phone,
                };
            },
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "16px 0",
                        }}
                    >
                        <div>Người nhận: {params.value.name}</div>
                        <div>Số điện thoại: {params.value.phone}</div>
                    </div>
                );
            },
        },
        { field: "created_At", headerName: "Ngày đặt", width: 300 },
        {
            field: "role",
            headerName: "Vai trò",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
    ];

    useEffect(() => {
        dispatch(getOrder(axiosRefresh));
    }, [dispatch]);

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={`${classes.headingAlias} ${classes.titleForm}`}>
                    Quản lý đơn hàng
                </Typography>
            </Box>
            <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                    className='datagrid-alias'
                    getRowId={(row) => row._id}
                    rows={orders}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowHeight={() => "auto"}
                    autoHeight={true}
                    disableColumnFilter={true}
                    disableColumnSelector={true}
                />
            </div>
        </>
    );
};

export default AdminOrder;
