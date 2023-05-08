import { Grid, Skeleton } from "@mui/material";

const Loading = ({
    spacing,
    columns,
    totalColumn,
}: {
    spacing: any;
    columns: any;
    totalColumn: any;
}) => {
    const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);

    return (
        <Grid item container spacing={spacing} columns={columns}>
            {arr.map((item, index) => (
                <Grid item xs={totalColumn} key={index} style={{ marginBottom: "26px" }}>
                    <Skeleton
                        variant='rectangular'
                        animation='wave'
                        style={{ width: "100%", paddingTop: "130%", borderRadius: "6px" }}
                    />
                    <Skeleton
                        variant='rectangular'
                        animation='wave'
                        style={{ marginTop: "16px", width: "100%", borderRadius: "6px" }}
                        height={20}
                    />
                    <Skeleton
                        variant='rectangular'
                        animation='wave'
                        style={{ marginTop: "6px", width: "100%", borderRadius: "6px" }}
                        height={20}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
export default Loading;
