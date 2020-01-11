import React from "react";
import { connect } from "react-redux";
import { addCartItem } from "../redux/actions";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";

const MenuView = props => {
    const classes = useStyles();
    const { menu, restaurantId } = props;

    const addToCart = item => () => {
        props.addCartItem(item, menu.restaurantId);
    };

    return (
        <div className={classes.root}>
            <Typography variant="h4">{menu.name}</Typography>
            <div>
                {menu.menuItems.map(item => (
                    <Paper elevation={2} key={item.id} className={classes.item}>
                        <div className={classes.flex}>
                            <div>
                                <Typography variant="h5">{item.name}</Typography>
                                <div className={classes.chips}>
                                    {item.ingredients.map((ingredient, i) => (
                                        <Chip
                                            key={i}
                                            label={ingredient.name}
                                            variant="outlined"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Typography variant="subtitle2" align="center">
                                    {item.price.toFixed(2) + "€"}
                                </Typography>
                                <Tooltip
                                    title={
                                        restaurantId !== -1 &&
                                        restaurantId !== menu.restaurantId
                                            ? "Can't mix items from different restaurants"
                                            : "Add to shopping cart"
                                    }
                                >
                                    <span>
                                        <Fab
                                            color="secondary"
                                            aria-label="add"
                                            size="small"
                                            disabled={
                                                restaurantId !== -1 &&
                                                restaurantId !== menu.restaurantId
                                            }
                                            onClick={addToCart(item)}
                                        >
                                            <AddShoppingCartIcon />
                                        </Fab>
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
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
    chips: {
        marginTop: theme.spacing(1),
        "& > *": {
            marginRight: theme.spacing(0.5)
        }
    }
}));

const mapStateToProps = state => ({
    restaurantId: state.shoppingCart.restaurantId
});

export default connect(mapStateToProps, { addCartItem })(MenuView);
