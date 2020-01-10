import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import styled from "@material-ui/core/styles/styled";
import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Login from "./Login";
import { setLoading } from "../redux/actions";

const NavBar = props => {
    const classes = useStyles();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { isLoggedIn, isLoading } = props;

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const logOut = e => {
        window.localStorage.removeItem("token");
        window.localStorage.setItem("tokenExpires", Date.now());
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Easy pizza
                    </Typography>

                    <React.Fragment>
                        <Tooltip title="Home">
                            <Link to="/">
                                <StyledButton>Home</StyledButton>
                            </Link>
                        </Tooltip>
                        {isLoggedIn ? (
                            <Tooltip title="Click to log out">
                                <StyledButton onClick={logOut}>Log out</StyledButton>
                            </Tooltip>
                        ) : (
                            <React.Fragment>
                                <Tooltip title="Open registeration page">
                                    <Link to="/register">
                                        <StyledButton>Register</StyledButton>
                                    </Link>
                                </Tooltip>
                                <Tooltip title="Click to open log in window">
                                    <StyledButton onClick={toggleLogin}>Log in</StyledButton>
                                </Tooltip>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Toolbar>
                <Login
                    close={() => setIsLoginOpen(false)}
                    isLoggedIn={isLoggedIn}
                    isOpen={isLoginOpen}
                />
                {isLoading ? <LinearProgress /> : null}
            </AppBar>
        </div>
    );
};

const StyledButton = styled(Button)({
    color: "white"
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const mapStateToProps = state => {
    return state.loadingState;
};

export default connect(mapStateToProps, { setLoading })(NavBar);
