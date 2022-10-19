import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllAlias } from "redux/aliasSlice";
import { RootState, useAppDispatch } from "redux/store";
import { DataGrid, GridApi, GridColDef, GridEditCellValueParams } from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import "./adminAlias.scss";
import { Link, useNavigate } from "react-router-dom";
import { Alias } from "interfaces/interface";
import aliasApi from "api/aliasApi";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
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
});

const AdminAlias = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAlias, setSelectedAlias] = useState<Alias>({} as Alias);

    const dispatch = useAppDispatch();
    const { aliases } = useSelector((state: RootState) => state.alias);
    const navigate = useNavigate();

    const classes = useStyles();

    const axiosRefresh = useAxios();

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
                const onClickEditAlias = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    navigate(`edit-alias/${thisRow._id}`);
                };

                const onClickDeleteAlias = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    const alias = {} as Alias;
                    alias["_id"] = thisRow["_id"]!.toString();
                    alias["name"] = thisRow["name"]!.toString();
                    alias["deleted"] = Boolean(thisRow["deleted"]);

                    setIsOpen(true);
                    setSelectedAlias(alias);
                };

                return (
                    <>
                        <Button onClick={onClickEditAlias} color='warning'>
                            <EditIcon fontSize='small' />
                        </Button>
                        <Button onClick={onClickDeleteAlias} color='error'>
                            <DeleteIcon fontSize='small' />
                        </Button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getAllAlias());
    }, [dispatch]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDeleteAlias = () => {
        const deleteAlias = async () => {
            try {
                await aliasApi.deleteAlias(selectedAlias._id, axiosRefresh);
            } catch (error) {
                console.log(error);
            }
        };

        handleClose();
        toast
            .promise(deleteAlias, {
                pending: "Đang chờ xử lý",
                success: "Xóa alias thành công",
                error: {
                    render({ data }) {
                        const { response } = data;
                        return `Xóa alias thất bại ${response.data?.message}`;
                    },
                },
            })
            .then(() => {
                dispatch(getAllAlias());
            });
    };

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={classes.headingAlias}>
                    product aliases
                    <Link to='trash-alias' className={classes.linkTrash}>
                        Trash
                    </Link>
                </Typography>
                <Button color='success' variant='contained'>
                    <Link to='create-alias' className={classes.linkAddAlias}>
                        <CreateNewFolderIcon sx={{ mr: 1 }} />
                        create
                    </Link>
                </Button>
            </Box>
            <div style={{ minHeight: 620, height: 400, width: "100%" }}>
                <DataGrid
                    className='datagrid-alias'
                    getRowId={(row) => row._id}
                    rows={aliases}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
                <Dialog open={isOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'> User </DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            Bạn có chắc chắn muốn xóa alias này?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary' variant='contained'>
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteAlias} color='error' variant='contained'>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default AdminAlias;
