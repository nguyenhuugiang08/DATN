import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    homeBasicContainer: {
        padding: "0 !important",
        marginBottom: "30px",
        marginTop: "50px",
    },
    homepageBasicContent: {
        background: "#000",
        color: "#fff",
        padding: "64px 64px 40px 64px",
    },
    homeBasicContentText: {
        fontSize: "3.65rem !important",
    },
    homeBasicThumbanil: {
        width: "100%",
    },
    homeBasicButton: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40px",
        borderRadius: "16px",
        border: "2px solid #000",
        backgroundColor: "#2f5acf",
        color: "#fff",
        padding: "0 30px",
        transition: "all .2s",
        cursor: "pointer",
        marginTop: "32px",
    },
});

const Image = () => {
    const { dataHome } = useSelector((state: RootState) => state.others);
    const classes = useStyles();

    return (
        <Container maxWidth='xxl' className={classes.homeBasicContainer}>
            <Grid container>
                <Grid item xs={5} className={classes.homepageBasicContent}>
                    <Typography className={classes.homeBasicContentText}>
                        {dataHome.homeBasic?.homepage_basic_content}
                    </Typography>
                    <button className={classes.homeBasicButton}>Khám phá ngay</button>
                </Grid>
                <Grid item xs={7}>
                    <img
                        src={dataHome.homeBasic?.home_basic_thumbnail}
                        alt='anh'
                        className={classes.homeBasicThumbanil}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};
export default Image;
