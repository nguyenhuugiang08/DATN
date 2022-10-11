import React from "react";
import { Link, useLocation } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    roadContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "capitalize",
        fontSize: "14px",
        lineHeight: "19.5px",
    },
    roadLink: {
        textDecoration: "none",
        color: "#878787",
    },
    roadIcon: {
        color: "#878787",
        fontSize: "14px !important",
        position: "relative",
        top: "1px",
        margin: "0 3px",
    },
});

const Roadmap: React.FC = () => {
    const { pathname } = useLocation();
    const roads = pathname.split("/");

    const classes = useStyles();

    return (
        <div className={classes.roadContainer}>
            <Link to='/admin' className={classes.roadLink}>
                dashboard
            </Link>
            <ChevronRightOutlinedIcon className={classes.roadIcon} />
            <Link to={`/admin/${roads[2]}`} className={classes.roadLink}>
                {roads[2]}
            </Link>
            <ChevronRightOutlinedIcon className={classes.roadIcon} />
            <span>{roads[3]}</span>
        </div>
    );
};

export default Roadmap;
