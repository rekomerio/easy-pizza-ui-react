import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "../Theme";
import Home from "./Home";
import Register from "./Register";
import NavBar from "./NavBar";
import UserManagement from "./UserManagement";
import CreateRestaurant from "./CreateRestaurant";
import CreateMenu from "./CreateMenu";
import RestaurantView from "./RestaurantView";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(isTokenValid());

        setInterval(() => {
            setIsLoggedIn(isTokenValid());
        }, 1000);
    }, []);

    const isTokenValid = () => {
        const token = window.localStorage.getItem("token");
        const tokenExpiration = window.localStorage.getItem("tokenExpires");
        const tokenExpirationLeft = tokenExpiration - Date.now();

        return tokenExpirationLeft > 0 && token.length > 0;
    };

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar isLoggedIn={isLoggedIn} />
                <div id="app">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route exact path="/restaurant/:id">
                            <RestaurantView />
                        </Route>
                        <Route path="/users/manage">
                            {isLoggedIn ? <UserManagement /> : <Register />}
                        </Route>
                        <Route path="/restaurant/create">
                            {isLoggedIn ? <CreateRestaurant /> : <Register />}
                        </Route>
                        <Route path="/restaurant/:id/menu/create">
                            {isLoggedIn ? <CreateMenu /> : <Register />}
                        </Route>
                    </Switch>
                </div>
            </ThemeProvider>
        </Router>
    );
};

export default App;
