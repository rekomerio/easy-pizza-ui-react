import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import API_URL_BASE from "../helpers/api-url";

const CreateRestaurant = () => {
    const classes = useStyles();
    const emptyFormData = {
        name: "",
        city: "",
        address: "",
        phone: "",
        postalCode: "",
        email: "",
        avatar: "",
        header: ""
    };
    const [formData, setFormData] = useState(emptyFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        name: true,
        city: true,
        address: true,
        phone: true
    });

    const token = window.localStorage.getItem("token");
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        setValidationErrors(prev => {
            return { ...prev, name: formData.name.length < 2 };
        });
    }, [formData.name]);

    useEffect(() => {
        setValidationErrors(prev => {
            return { ...prev, city: formData.city.length < 2 };
        });
    }, [formData.city]);

    useEffect(() => {
        setValidationErrors(prev => {
            return { ...prev, address: formData.address.length < 2 };
        });
    }, [formData.address]);

    useEffect(() => {
        setValidationErrors(prev => {
            return { ...prev, phone: formData.phone.length < 10 };
        });
    }, [formData.phone]);

    const handleSubmit = e => {
        e.preventDefault();

        setIsSubmitting(true);
        axios
            .post(API_URL_BASE + "restaurants", formData)
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    setFormData(emptyFormData);
                }
            })
            .catch(err => console.log(err.response))
            .finally(() => setIsSubmitting(false));
    };

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create restaurant</h2>
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    required
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    helperText={validationErrors.name ? "Name is required" : ""}
                    error={validationErrors.name}
                    fullWidth
                />
                <TextField
                    required
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text"
                    helperText={validationErrors.city ? "City is required" : ""}
                    error={validationErrors.city}
                    fullWidth
                />
                <TextField
                    required
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                    helperText={validationErrors.address ? "Address is required" : ""}
                    error={validationErrors.address}
                    fullWidth
                />
                <TextField
                    required
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    helperText={validationErrors.phone ? "Phone is required" : ""}
                    error={validationErrors.phone}
                    fullWidth
                />
                <TextField
                    label="Postal code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    type="text"
                    fullWidth
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="text"
                    fullWidth
                />
                <TextField
                    label="Avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    type="url"
                    fullWidth
                />
                <TextField
                    label="Header"
                    name="header"
                    value={formData.header}
                    onChange={handleChange}
                    type="url"
                    fullWidth
                />

                <Button
                    classes={{ root: classes.button }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
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

export default CreateRestaurant;
