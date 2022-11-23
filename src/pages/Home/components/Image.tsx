import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Container, Grid } from "@mui/material";

const Image = () => {
    const { dataHome } = useSelector((state: RootState) => state.others);
    const thumbnail = dataHome.bannerUrls?.[0];

    return (
        <Container>
            <Grid>
                <img src={thumbnail} alt='anh' style={{ width: "100%", marginBottom: "30px" }} />
            </Grid>
        </Container>
    );
};
export default Image;
