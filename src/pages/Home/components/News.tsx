import { Container, Grid, Typography, Box } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const News: React.FC = () => {
    const { dataHome } = useSelector((state: RootState) => state.others);
    let localLocale = moment();
    const currentDate = `${localLocale.locale("vi").format("dddd")}, ${localLocale.format("l")}`;

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>tin tức</Typography>
                </Grid>
                <Grid item container>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                        {dataHome.news?.map((news) => (
                            <Box key={news._id}>
                                <Typography>{news.title}</Typography>
                                <Typography>{currentDate}</Typography>
                                <Typography>{news.content}</Typography>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
export default News;
