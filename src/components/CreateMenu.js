import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import API_URL_BASE from "../helpers/api-url";
import CreateMenuItem from "./CreateMenuItem";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";

const CreateMenu = () => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [items, setItems] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const restaurantId = parseInt(useParams().id);

    const handleSubmit = e => {
        e.preventDefault();

        const menu = {
            restaurantId: restaurantId,
            name: name,
            menuItems: items
        };

        setIsSubmitting(true);

        axios
            .post(API_URL_BASE + "menus", menu)
            .then(res => {
                // Delete all elements
                const arr = items.map((item, i) => {
                    item.isVisible = false;
                    return item;
                });

                setItems(arr);
            })
            .catch(err => console.log(err.response))
            .finally(() => setIsSubmitting(false));
    };

    const handleChange = e => {
        setName(e.target.value);
    };

    return (
        <div className={classes.root}>
            <Typography variant="h4">Create menu ({restaurantId})</Typography>
            <Typography variant="subtitle1">Items on the menu: {items.length}</Typography>
            <TextField
                required
                label="Name"
                name="name"
                value={name}
                onChange={handleChange}
                type="text"
                fullWidth
                helperText="Name of the menu. For example: Pizza menu, Kebab menu"
            />
            <CreateMenuItem items={items} setItems={setItems} />
            <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={isSubmitting || !name}
            >
                Create your menu
            </Button>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        maxWidth: 800,
        minWidth: 600,
        "& .MuiTextField-root": {
            margin: theme.spacing(1)
        }
    }
}));

export default CreateMenu;
