import React from "react";
import { connect } from "react-redux";
import { getShoppingCartIds, getShoppingCartPrice } from "../redux/selectors";
import ShoppingCartItem from "./ShoppingCartItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const ShoppingCart = props => {
    const classes = useStyles();
    const { ids, price, restaurantId, discount } = props;

    return (
        <div className={classes.root}>
            <Typography variant="h6">Total: {price.toFixed(2)} €</Typography>
            <Typography variant="body1">Restaurant ID: {restaurantId}</Typography>
            <Typography variant="subtitle2">Discount: {discount * 100} %</Typography>
            {ids.map(id => (
                <ShoppingCartItem key={id} id={id} />
            ))}
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        width: 600
    }
}));

const mapStateToProps = state => ({
    ids: getShoppingCartIds(state),
    price: getShoppingCartPrice(state),
    restaurantId: state.shoppingCart.restaurantId,
    discount: state.shoppingCart.discount
});

export default connect(mapStateToProps)(ShoppingCart);
