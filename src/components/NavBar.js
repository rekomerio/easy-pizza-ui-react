import React, { useState } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import styled from "@material-ui/core/styles/styled";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Login from "./Login";

const NavBar = props => {
    const classes = useStyles();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { isLoggedIn } = props;

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const logOut = e => {
        window.localStorage.removeItem("token");
        window.localStorage.setItem("tokenExpires", Date.now());
    };

    return (
        <div className={classes.navBar}>
            <div>
                <Link to="/">
                    <StyledButton>Easy Pizza</StyledButton>
                </Link>
            </div>
            <div>
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
            </div>
            <Login
                close={() => setIsLoginOpen(false)}
                isLoggedIn={isLoggedIn}
                isOpen={isLoginOpen}
            />
        </div>
    );
};

const StyledButton = styled(Button)({
    color: "white"
});

const useStyles = makeStyles(theme => ({
    navBar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        position: "fixed",
        top: 0,
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1)
    }
}));

export default NavBar;
