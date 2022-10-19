import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "redux/store";
import { DataGrid, GridApi, GridColDef, GridEditCellValueParams } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { useNavigate } from "react-router-dom";
import { Picture } from "interfaces/interface";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import useAxios from "hooks/useAxios";
import { getTrashNews } from "redux/newsSlice";
import newsApi from "api/newsApi";
import Roadmap from "components/Admin/components/Roadmap";

const useStyles = makeStyles({
    containerBox: {
        height: "67px",
        margin: "0 -20px 10px",
        padding: "13px 20px",
        display: "flex",
        justifyContent: "space-between",
    },
    headingNews: {
        fontSize: "18px !important",
        lineHeight: "26px !important",
        textTransform: "capitalize",
        color: "#212121",
        paddingTop: "6px",
    },
    linkAddNews: {
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
    pictureNews: {
        width: "160px",
        height: "100px",
        objectFit: "contain",
    },
});

const TrashNews = () => {
    const dispatch = useAppDispatch();
    const { trashNews } = useSelector((state: RootState) => state.news);
    const navigate = useNavigate();

    const classes = useStyles();

    const axiosRefresh = useAxios();

    const columns: GridColDef[] = [
        {
            field: "pictures",
            headerName: "Photo",
            width: 180,
            renderCell: (params) => {
                const listPictures: Picture[] = params.value;
                return (
                    <div>
                        {listPictures?.map(
                            (picture: Picture, index: number) =>
                                index === 0 && (
                                    <img
                                        src={picture.url}
                                        alt='Ppicture'
                                        key={picture._id}
                                        className={classes.pictureNews}
                                    />
                                )
                        )}
                    </div>
                );
            },
        },
        { field: "_id", headerName: "ID", width: 160, hide: true },
        { field: "title", headerName: "Title", width: 160 },
        { field: "content", headerName: "Content", width: 700, sortable: false },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 200,
            renderCell: (params) => {
                const onClickRestoreNews = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridEditCellValueParams> = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    const restoreNews = async () => {
                        try {
                            await newsApi.restoreNews(thisRow._id!.toString(), axiosRefresh);
                        } catch (error) {
                            console.log(error);
                        }
                    };

                    toast
                        .promise(restoreNews, {
                            pending: "Đang chờ xử lý",
                            success: "Khôi phục news thành công",
                            error: {
                                render({ data }) {
                                    const { response } = data;
                                    return `Khôi phục news thất bại ${response.data?.message}`;
                                },
                            },
                        })
                        .then(() => {
                            navigate("/admin/news");
                        });
                };

                return (
                    <>
                        <Button onClick={onClickRestoreNews} color='primary'>
                            <RestoreFromTrashIcon fontSize='small' />
                        </Button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getTrashNews(axiosRefresh));
    }, [dispatch]);

    return (
        <>
            <Box className={classes.containerBox}>
                <Typography className={classes.headingNews}>Restore News</Typography>
                <Roadmap />
            </Box>
            <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                    className='datagrid-News'
                    getRowId={(row) => row._id}
                    rows={trashNews}
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

export default TrashNews;
