import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "redux/store";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { News } from "interfaces/interface";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { createTrue } from "typescript";

const useStyles = makeStyles({
    newsTitle: {
        backgroundColor: "#212121",
        borderTopLeftRadius: "6px",
        borderTopRightRadius: "6px",
        marginBottom: "15px",
    },
    newsImg: {
        paddingTop: "52%",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    newsLink: {
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: 500,
        color: "#000",
        margin: "20px 0 8px",
        display: "block",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",

        "&:hover": {
            color: "#007bff",
        },
    },
    newsContent: {
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        color: "#6c757d",
    },
    listNewsContent: {
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        color: "#6c757d",
    },
    newsThumbnail: {
        paddingTop: "100%",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    seeAllBtn: {
        fontSize: "16px !important",
        margin: "16px 0 30px 0 !important",

        "&:hover": {
            color: "#fff !important",
            backgroundColor: "#cd6420 !important",
        },
    },
});

const NewsHome: React.FC = () => {
    const { dataHome } = useSelector((state: RootState) => state.others);
    const classes = useStyles();

    let localLocale = moment();
    const currentDate = `${localLocale.locale("vi").format("dddd")}, ${localLocale.format("l")}`;

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} className={classes.newsTitle}>
                    <Typography
                        sx={{
                            fontSize: "20px !important",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            color: "#fff",
                            padding: "10px",
                        }}
                    >
                        tin tức
                    </Typography>
                </Grid>
                <Grid
                    item={true}
                    container
                    spacing={2}
                    sx={{
                        border: "1px solid #212121",
                        boxShadow: "1px 2px 1px 0 #cccccc",
                        ml: 0,
                        borderBottomLeftRadius: "6px",
                        borderBottomRightRadius: "6px",
                        mb: 4,
                    }}
                >
                    <Grid item={true} xs={6}>
                        <Box
                            style={{
                                backgroundImage: `url(${dataHome.news?.[0].pictures[0].url})`,
                            }}
                            className={classes.newsImg}
                        ></Box>
                        <Link to={`news/${dataHome.news?.[0]._id}`} className={classes.newsLink}>
                            {dataHome.news?.[0].title}
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
                        >
                            <CalendarMonthIcon
                                fontSize='small'
                                sx={{ mr: 1, position: "relative", top: "-1px" }}
                            />
                            {currentDate}
                        </Typography>
                        <Typography className={classes.newsContent}>
                            {dataHome.news?.[0].content}
                        </Typography>
                        <Link
                            to={`news/${dataHome.news?.[0]._id}`}
                            style={{ marginTop: "16px", display: "block", textDecoration: "none" }}
                        >
                            <Button
                                color='secondary'
                                variant='outlined'
                                sx={{ textTransform: "none" }}
                            >
                                Đọc tiếp
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item={true} xs={6} sx={{ paddingRight: "16px" }}>
                        {dataHome.news?.map(
                            (news: News, index: number) =>
                                index !== 0 && (
                                    <Grid container spacing={1} key={news._id}>
                                        <Grid item xs={4}>
                                            <Box
                                                style={{
                                                    backgroundImage: `url(${news.pictures[0].url})`,
                                                }}
                                                sx={{
                                                    paddingTop: "50%",
                                                    backgroundSize: "cover",
                                                    marginTop: "10px",
                                                    borderRadius: "6px",
                                                }}
                                            ></Box>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Box key={news._id}>
                                                <Link
                                                    to={`news/${news._id}`}
                                                    className={classes.newsLink}
                                                    style={{ marginTop: "8px", marginBottom: 0 }}
                                                >
                                                    {news.title}
                                                </Link>
                                                <Typography>
                                                    <CalendarMonthIcon
                                                        fontSize='small'
                                                        sx={{
                                                            mr: 1,
                                                            position: "relative",
                                                            top: "2px",
                                                        }}
                                                    />
                                                    {currentDate}
                                                </Typography>
                                                <Typography
                                                    className={classes.listNewsContent}
                                                    sx={{ fontSize: "16px" }}
                                                >
                                                    {news.content}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )
                        )}
                    </Grid>
                    <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant='outlined'
                            color='warning'
                            className={classes.seeAllBtn}
                            sx={{ textTransform: "none" }}
                        >
                            Xem tất cả
                            <ArrowForwardIosIcon
                                sx={{ fontSize: "14px", position: "relative", top: "1px" }}
                            />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
export default NewsHome;
