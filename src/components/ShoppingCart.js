import React from "react";
import { connect } from "react-redux";
import { getShoppingCartIds, getShoppingCartPrice } from "../redux/selectors";
import ShoppingCartItem from "./ShoppingCartItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const ShoppingCart = props => {
    const classes = useStyles();
    const { ids, price } = props;

    return (
        <div className={classes.root}>
            <Typography variant="h6">Price: {price.toFixed(2)} €</Typography>
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

const mapStateToProps = state => {
    return { ids: getShoppingCartIds(state), price: getShoppingCartPrice(state) };
};

export default connect(mapStateToProps)(ShoppingCart);
