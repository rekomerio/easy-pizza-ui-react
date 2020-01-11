import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setLoading } from "../redux/actions";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_URL_BASE from "../helpers/api-url";
import Typography from "@material-ui/core/Typography";
import MenuView from "./MenuView";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ShoppingCart from "./ShoppingCart";

const RestaurantView = props => {
    const classes = useStyles();
    const [restaurant, setRestaurant] = useState({});
    const [menus, setMenus] = useState([]);
    const restaurantId = useParams().id;

    useEffect(() => {
        axios
            .get(API_URL_BASE + "restaurants/" + restaurantId)
            .then(res => {
                setRestaurant(res.data);
            })
            .catch(err => {
                setRestaurant(null);
            });
    }, []);

    useEffect(() => {
        props.setLoading(true);
        axios
            .get(API_URL_BASE + "menus/restaurant/" + restaurantId)
            .then(res => {
                console.log(res.data);
                setMenus(res.data);
            })
            .catch(err => console.log(err))
            .finally(() => props.setLoading(false));
    }, []);

    const getMenus = () => {
        if (menus.length === 0) return <div>No menus</div>;
        return menus.map(menu => <MenuView key={menu.id} menu={menu} />);
    };

    if (!restaurant) {
        return (
            <div>
                <Typography variant="h4">Not found</Typography>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div
                style={{ backgroundImage: `url(${restaurant.header})` }}
                className={classes.header}
                alt="Restaurant"
            ></div>
            <div className={classes.restaurant}>
                <Typography variant="h2">{restaurant.name}</Typography>
                <div>
                    <Typography variant="h5">{restaurant.city}</Typography>
                    <Typography variant="h6">{restaurant.address}</Typography>
                    <Typography variant="subtitle1">{restaurant.phone}</Typography>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.menu}>{getMenus()}</div>
            </div>
            <ShoppingCart />
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: "100vh"
    },
    header: {
        width: "100vw",
        height: 350,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    restaurant: {
        backgroundColor: "white",
        justifyContent: "space-evenly",
        display: "flex",
        alignItems: "center"
    },
    content: {},
    menu: {
        margin: "auto",
        width: 1000,
        ["@media (max-width:1000px)"]: {
            // eslint-disable-line no-useless-computed-key
            width: "100%"
        }
    }
}));

export default connect(null, { setLoading })(RestaurantView);
