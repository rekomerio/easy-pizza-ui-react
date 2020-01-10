import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";
import API_URL_BASE from "../helpers/api-url";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const Login = props => {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const { isOpen } = props;

    const handleClickAway = () => {
        console.log("Click away");
    };

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        axios
            .post(API_URL_BASE + "users/authenticate", credentials)
            .then(res => {
                if (res.data.token) {
                    const tomorrow = Date.now() + 86400000;
                    window.localStorage.setItem("token", res.data.token);
                    window.localStorage.setItem("tokenExpires", tomorrow);

                    setMessage("Login success!");

                    setTimeout(() => {
                        props.close();
                        setMessage("");
                        setCredentials({ email: "", password: "" });
                    }, 750);
                }
            })
            .catch(err => {
                if (err.response) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("No connection to server");
                }
            })
            .finally(() => setIsSubmitting(false));
    };

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const fieldsAreEmpty = () =>
        credentials.email.length === 0 || credentials.password.length === 0;

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Paper elevation={2} className={classes.loginWindow}>
                <Collapse in={isOpen} timeout={250}>
                    <form
                        className={classes.form}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            label="Email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            type="email"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                        <Zoom in={Boolean(message)}>
                            <Typography variant="subtitle2" gutterBottom>
                                {message}
                            </Typography>
                        </Zoom>
                        <Button
                            classes={{ root: classes.button }}
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={isSubmitting || fieldsAreEmpty()}
                        >
                            Log in
                        </Button>
                    </form>
                </Collapse>
            </Paper>
        </ClickAwayListener>
    );
};

const useStyles = makeStyles(theme => ({
    loginWindow: {
        position: "absolute",
        top: 60,
        right: 10,
        maxWidth: 350,
        borderRadius: theme.spacing(1),
        textAlign: "center"
    },
    form: {
        margin: theme.spacing(2),
        maxWidth: 600,
        minWidth: 240,
        "& .MuiTextField-root": {
            margin: theme.spacing(1)
        }
    },
    button: {
        display: "block",
        margin: theme.spacing(1),
        width: "100%"
    }
}));

export default Login;
