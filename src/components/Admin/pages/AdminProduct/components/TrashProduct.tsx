import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import { DataGrid, GridApi, GridColDef, GridEditCellValueParams } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import Roadmap from "components/Admin/components/Roadmap";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import productApi from "api/productApi";
import { Thumbnail } from "interfaces/interface";
import { getTrashProducts } from "redux/productSlice";
import useAxios from "hooks/useAxios";

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
    thumbnailProduct: {
        width: "80px",
        height: "100px",
        margin: "16px",
        objectFit: "contain",
    },
});

const TrashProduct = () => {
    const dispatch = useAppDispatch();
    const { trashProducts } = useSelector((state: RootState) => state.product);
    const navigate = useNavigate();

    const axiosRefresh = useAxios();

    const classes = useStyles();

    const columns: GridColDef[] = [
        {
            field: "thumbnails",
            headerName: "Photo",
            width: 180,
            renderCell: (params) => {
                const listThumbnails: Thumbnail[] = params.value;
                return (
                    <div>
                        {listThumbnails?.map(
                            (thumbnail: Thumbnail, index: number) =>
                                index === 0 && (
                                    <img
                                        src={thumbnail.url}
                                        alt='thumbnail'
                                        key={thumbnail._id}
                                        className={classes.thumbnailProduct}
                                    />
                                )
                        )}
                    </div>
                );
            },
        },
        { field: "_id", headerName: "ID", width: 240 },
        { field: "trademark", headerName: "Trademark", width: 160 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "quantity", headerName: "Quantity", width: 160 },
        { field: "price", headerName: "Price", width: 120 },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 180,
            renderCell: (params) => {
                const onClickRestoreProduct = (
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    toast
                        .promise(productApi.restoreProduct(thisRow._id!.toString(), axiosRefresh), {
                            pending: "Đang chờ xử lý",
                            success: "Khôi phục product thành công",
                            error: {
                                render({ data }) {
                                    const { response } = data;
                                    return `Khôi phục product thất bại ${response.data?.message}`;
                                },
                            },
                        })
                        .then(() => {
                            navigate("/admin/products");
                        });
                };

                return (
                    <>
                        <Button onClick={onClickRestoreProduct} color='info'>
                            <RestoreFromTrashIcon fontSize='small' />
                        </Button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getTrashProducts(axiosRefresh));   
    }, [dispatch]);

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={classes.headingAlias}>trash products</Typography>
                <Roadmap />
            </Box>
            <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                    className='datagrid-alias'
                    getRowId={(row) => row._id}
                    rows={trashProducts}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowHeight={() => "auto"}
                    autoHeight={true}
                />
            </div>
        </>
    );
};

export default TrashProduct;
