import React from "react";
import { connect } from "react-redux";
import { getShoppingCartItemById } from "../redux/selectors";
import { removeCartItem, addCartItem } from "../redux/actions";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const ShoppingCartItem = props => {
    const classes = useStyles();
    const { item } = props;

    const removeItem = item => () => {
        props.removeCartItem(item);
    };

    const addItem = item => () => {
        props.addCartItem(item);
    };

    return (
        <Paper elevation={2} className={classes.item}>
            <div className={classes.flex}>
                <div>
                    <Typography variant="h5">{item.name}</Typography>
                    <Typography variant="subtitle1">ID: {item.id}</Typography>
                    <Typography variant="subtitle2">
                        Unit price: {item.price.toFixed(2)}€
                    </Typography>
                    <Typography variant="subtitle2">Quantity: {item.quantity}</Typography>
                    <div className={classes.chips}>
                        {item.ingredients.map((ingredient, i) => (
                            <Chip key={i} label={ingredient.name} variant="outlined" />
                        ))}
                    </div>
                </div>
                <div>
                    <Typography variant="subtitle2" align="center">
                        {(item.price * item.quantity).toFixed(2) + "€"}
                    </Typography>
                    <span className={classes.buttons}>
                        <Fab
                            color="secondary"
                            aria-label="add"
                            size="small"
                            onClick={addItem(item)}
                        >
                            <AddIcon />
                        </Fab>
                        <Fab
                            color="primary"
                            aria-label="remove"
                            size="small"
                            onClick={removeItem(item)}
                        >
                            <RemoveIcon />
                        </Fab>
                    </span>
                </div>
            </div>
        </Paper>
    );
};

const useStyles = makeStyles(theme => ({
    item: {
        padding: theme.spacing(2),
        margin: theme.spacing(0.5)
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "left"
    },
    buttons: {
        "& > *": {
            margin: theme.spacing(0.5)
        }
    },
    chips: {
        marginTop: theme.spacing(1),
        "& > *": {
            marginRight: theme.spacing(0.5)
        }
    }
}));

// Props are regular props from other components
const mapStateToProps = (state, props) => ({
    item: getShoppingCartItemById(state, props.id)
});

export default connect(mapStateToProps, { removeCartItem, addCartItem })(ShoppingCartItem);
