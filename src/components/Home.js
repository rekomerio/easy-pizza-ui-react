import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL_BASE from "../helpers/api-url";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const Home = () => {
    const classes = useStyles();
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios
            .get(API_URL_BASE + "restaurants")
            .then(res => {
                setRestaurants(res.data);
            })
            .catch(err => {
                setRestaurants(null);
            });
    }, []);

    if (!restaurants) return <div>No connection</div>;
    if (restaurants.length === 0) return <div>Loading...</div>;

    return (
        <div className={classes.root}>
            <Grid className={classes.grid} container spacing={3}>
                {restaurants.map(restaurant => (
                    <Grid item xs key={restaurant.id}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <Link to={"restaurant/" + restaurant.id}>
                                    <CardMedia
                                        className={classes.media}
                                        image={restaurant.header}
                                        title={restaurant.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {restaurant.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {restaurant.address}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {restaurant.city}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {restaurant.phone}
                                        </Typography>
                                    </CardContent>
                                </Link>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: 100
    },
    grid: {},
    card: {
        maxWidth: 350,
        minWidth: 250
    },
    media: {
        height: 140
    }
});

export default Home;
