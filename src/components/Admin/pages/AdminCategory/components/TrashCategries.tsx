import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import { DataGrid, GridApi, GridColDef, GridEditCellValueParams } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { getTrashCategory } from "redux/categorySlice";
import Roadmap from "components/Admin/components/Roadmap";
import categoryApi from "api/categoryApi";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

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
    },
});

const TrashCategory = () => {
    const dispatch = useAppDispatch();
    const { trashCategories } = useSelector((state: RootState) => state.category);
    const navigate = useNavigate();

    const classes = useStyles();

    const columns: GridColDef[] = [
        { field: "_id", headerName: "ID", width: 320 },
        { field: "name", headerName: "Name", width: 240 },
        { field: "aliasName", headerName: "Alias name", width: 240 },
        { field: "deleted", headerName: "Deleted", width: 170, sortable: false },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 200,
            renderCell: (params) => {
                const onClickRestoreCategory = (
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    toast
                        .promise(categoryApi.restoreCategory(thisRow._id!.toString()), {
                            pending: "Đang chờ xử lý",
                            success: "Khôi phục category thành công",
                            error: {
                                render({ data }) {
                                    const { response } = data;
                                    return `Khôi phục category thất bại ${response.data?.message}`;
                                },
                            },
                        })
                        .then(() => {
                            navigate("/admin/categories");
                        });
                };

                return (
                    <>
                        <Button onClick={onClickRestoreCategory} color='info'>
                            <RestoreFromTrashIcon fontSize='small' />
                        </Button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getTrashCategory());
    }, [dispatch]);

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={classes.headingAlias}>trash categories</Typography>
                <Roadmap />
            </Box>
            <div style={{ minHeight: 620, height: 400, width: "100%" }}>
                <DataGrid
                    className='datagrid-alias'
                    getRowId={(row) => row._id}
                    rows={trashCategories}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
            </div>
        </>
    );
};

export default TrashCategory;
