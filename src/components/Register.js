import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import API_URL_BASE from "../helpers/api-url";

const Register = props => {
    const classes = useStyles();
    const emptyFormData = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: ""
    };
    const [formData, setFormData] = useState(emptyFormData);
    const [validationErrors, setValidationErrors] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (formData.password === formData.confirmPassword) {
            setValidationErrors(prev => {
                return { ...prev, confirmPassword: "" };
            });
        } else {
            setValidationErrors(prev => {
                return {
                    ...prev,
                    confirmPassword: "Passwords do not match"
                };
            });
        }
    }, [formData.password, formData.confirmPassword]); // This useEffect is only called when either of these change

    useEffect(() => {
        if (formData.password.length < 5) {
            setValidationErrors(prev => {
                return {
                    ...prev,
                    password: "Password must be at least 5 characters long"
                };
            });
        } else {
            setValidationErrors(prev => {
                return { ...prev, password: "" };
            });
        }
    }, [formData.password]);

    const submitForm = e => {
        e.preventDefault();

        if (formIsNotValid()) {
            return;
        }

        setIsSubmitting(true);

        axios
            .post(API_URL_BASE + "users/register", formData)
            .then(res => {
                console.log(res);
                setFormData(emptyFormData);
            })
            .catch(err => console.error(err))
            .finally(() => setIsSubmitting(false));
    };

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formIsValid = () => {
        let isValid = true;
        // Check are error strings empty (no errors if they are)
        Object.keys(validationErrors).forEach(key => {
            if (validationErrors[key]) {
                isValid = false;
            }
        });
        // Check are formData strings empty (no errors if they are filled)
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                isValid = false;
            }
        });

        return isValid;
    };

    const formIsNotValid = () => !formIsValid();

    return (
        <div>
            <h2>Register</h2>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={submitForm}>
                <TextField
                    required
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(validationErrors.email)}
                    helperText={validationErrors.email}
                    type="email"
                    fullWidth
                />
                <TextField
                    required
                    label="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(validationErrors.firstName)}
                    helperText={validationErrors.firstName}
                    type="text"
                    fullWidth
                />
                <TextField
                    required
                    label="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(validationErrors.lastName)}
                    helperText={validationErrors.lastName}
                    type="text"
                    fullWidth
                />
                <TextField
                    required
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(validationErrors.password)}
                    helperText={validationErrors.password}
                    type="password"
                    fullWidth
                />
                <TextField
                    required
                    label="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={Boolean(validationErrors.confirmPassword)}
                    helperText={validationErrors.confirmPassword}
                    type="password"
                    fullWidth
                />
                <Button
                    classes={{ root: classes.button }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || formIsNotValid()}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        maxWidth: 600,
        minWidth: 240,
        "& .MuiTextField-root": {
            margin: theme.spacing(1)
        }
    },
    button: {
        display: "block",
        margin: theme.spacing(1)
    }
}));

export default Register;
