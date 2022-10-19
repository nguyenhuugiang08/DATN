import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridApi, GridColDef, GridEditCellValueParams } from "@mui/x-data-grid";
import Roadmap from "components/Admin/components/Roadmap";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTrashAlias } from "redux/aliasSlice";
import { RootState, useAppDispatch } from "redux/store";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { toast } from "react-toastify";
import aliasApi from "api/aliasApi";
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
});

const TrashAlias = () => {
    const dispatch = useAppDispatch();
    const { trashAliases } = useSelector((state: RootState) => state.alias);

    const axiosRefresh = useAxios();

    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTrashAlias(axiosRefresh));
    }, [dispatch]);

    const columns: GridColDef[] = [
        { field: "_id", headerName: "ID", width: 320 },
        { field: "name", headerName: "Name", width: 240 },
        { field: "deleted", headerName: "Deleted", width: 170, sortable: false },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 200,
            renderCell: (params) => {
                const onClickRestoreAlias = (
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    toast
                        .promise(aliasApi.restoreAlias(thisRow["_id"]!.toString(), axiosRefresh), {
                            pending: "Đang chờ xử lý",
                            success: "Restore alias thành công",
                            error: {
                                render({ data }) {
                                    const { response } = data;
                                    return `Restore alias thất bại ${response.data?.message}`;
                                },
                            },
                        })
                        .then(() => {
                            navigate("/admin/alias");
                        });
                };

                return (
                    <>
                        <Button onClick={onClickRestoreAlias} color='info'>
                            <RestoreFromTrashIcon fontSize='small' />
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={classes.headingAlias}>product aliases</Typography>
                <Roadmap />
            </Box>
            <div style={{ minHeight: 620, height: 400, width: "100%" }}>
                <DataGrid
                    className='datagrid-alias'
                    getRowId={(row) => row._id}
                    rows={trashAliases}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
            </div>
        </>
    );
};

export default TrashAlias;
