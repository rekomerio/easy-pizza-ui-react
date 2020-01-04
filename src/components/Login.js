import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";
import API_URL_BASE from "../helpers/api-url";

const Login = props => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const { isOpen } = props;

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
    <div className={classes.loginWindow}>
      <Collapse in={isOpen}>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
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
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  loginWindow: {
    position: "absolute",
    top: 50,
    right: 10,
    maxWidth: 350,
    borderRadius: 5,
    boxShadow: "0px 10px 15px 2px #d0d0d0",
    zIndex: 5000
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
