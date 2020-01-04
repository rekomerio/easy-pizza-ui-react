import React from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from "@material-ui/core/Chip";
import Fab from "@material-ui/core/Fab";
import RemoveIcon from "@material-ui/icons/Remove";
import CreateItem from "./CreateItem";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import AnimatedDeletion from "./AnimatedDeletion";
import Paper from "@material-ui/core/Paper";

const CreateMenuItem = props => {
    const classes = useStyles();
    const { items, setItems } = props;

    const addItem = item => {
        setItems([...items, { name: item, ingredients: [], price: 8, isVisible: true }]);
    };

    const addIngredient = element => ingredient => {
        const arr = [...items];
        arr[element].ingredients.push({ name: ingredient });

        setItems(arr);
    };

    const deleteIngredient = (i, j) => () => {
        const arr = items.map((item, ii) => {
            const ingredients = item.ingredients.filter(
                (ingredient, jj) => i !== ii || j !== jj
            );
            item.ingredients = ingredients;
            return item;
        });
        setItems(arr);
    };

    const deleteItem = index => () => {
        setItems(items.filter((item, i) => i !== index));
    };

    const hideItem = index => () => {
        const arr = items.map((item, i) => {
            item.isVisible = i !== index;
            return item;
        });

        setItems(arr);
    };

    const handlePriceChange = e => {
        const price = e.target.value;

        if (Number.isNaN(parseFloat(price))) {
            return;
        }

        const index = e.target.id.split("-")[1];
        const arr = [...items];
        arr[index].price = parseFloat(price);
        setItems(arr);
    };

    return (
        <div>
            <ul>
                {items.map((item, i) => (
                    <li key={i}>
                        <AnimatedDeletion
                            isVisible={items[i].isVisible}
                            onDelete={deleteItem(i)}
                            timeout={250}
                        >
                            <Paper elevation={3} className={classes.item}>
                                <div className={classes.flexContainer}>
                                    <div className="asd">
                                        <Typography variant="caption">Name</Typography>
                                        <Typography variant="h6">{item.name}</Typography>
                                    </div>
                                    <TextField
                                        className={classes.price}
                                        type="number"
                                        label="Price (€)"
                                        name="price"
                                        id={"price-" + i}
                                        value={items[i].price}
                                        onChange={handlePriceChange}
                                    />
                                    <Tooltip title="Delete this item">
                                        <Fab size="small" onClick={hideItem(i)}>
                                            <RemoveIcon />
                                        </Fab>
                                    </Tooltip>
                                </div>
                                <CreateItem
                                    label="Ingredient"
                                    add={addIngredient(i)}
                                    disabled={items.length < 1}
                                />
                                <div className={classes.chips}>
                                    {item.ingredients.map((ingredient, j) => (
                                        <Chip
                                            key={j}
                                            label={ingredient.name}
                                            onDelete={deleteIngredient(i, j)}
                                            classes={{ root: classes.chip }}
                                        />
                                    ))}
                                </div>
                            </Paper>
                        </AnimatedDeletion>
                    </li>
                ))}
            </ul>
            <CreateItem label="Item" add={addItem}></CreateItem>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    flexContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: theme.spacing(1)
    },
    item: {
        minWidth: 450,
        padding: theme.spacing(2),
        margin: theme.spacing(1)
    },
    price: {
        maxWidth: 100
    },
    chips: {
        maxWidth: 450,
        minHeight: 36
    },
    chip: {
        margin: 2
    }
}));

export default CreateMenuItem;
